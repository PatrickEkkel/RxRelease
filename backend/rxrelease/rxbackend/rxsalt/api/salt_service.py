import logging,sys
from rxbackend.rxsalt.api.salt_api import SaltApi
from rxbackend.rxsalt.restapi.REST_minions import REST_minions


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SaltService:

    def __init__(self, ssh_connection, salt_connection,auth_token):
        self.salt_api = SaltApi(ssh_connection, salt_connection)
        self._auth_token = auth_token

    def accept_minion(self, host):
        minions = self.salt_api.list_all_unaccepted_minions()
        result = None
        for minion in minions:
            if minion == host['hostname']:
                logger.debug("found minion with id " + host['hostname'] + ' accepting key')
                result = self.salt_api.accept_minion(minion)
                # TODO: check resultcode from salt
                minion_api = REST_minions(self._auth_token)
                # This is the first time we post an object from a statehandler context,
                minion_dict = {}
                minion_dict['host'] = host['id']
                minion_dict['minion_id'] = minion
                minion_dict['accepted'] = True
                minion_api.post_minion(minion_dict)
                break

        if result is None:
            logger.error('no salt-minion found with hostname: ' + host['hostname'] + ' that has unaccepted keys')


    def accept_unaccepted_minions(self):
        minions = self.salt_api.list_all_unaccepted_minions()
        for minion in minions:
            self.salt_api.accept_minion(minion)
