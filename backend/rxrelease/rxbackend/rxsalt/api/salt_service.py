import logging,sys
from rxbackend.rxsalt.api.salt_api import SaltApi


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SaltService:

    def __init__(self, ssh_connection, salt_connection):
        self.salt_api = SaltApi(ssh_connection, salt_connection)

    def accept_minion(self, host):
        minions = self.salt_api.list_all_unaccepted_minions()
        result = None
        for minion in minions:
            if minion == host['hostname']:
                logger.debug("found minion with id " + host['hostname'] + ' accepting key')
                result = self.salt_api.accept_minion(minion)
                break

        if result is None:
            logger.error('no salt-minion found with hostname: ' + host['hostname'] + ' that has unaccepted keys')


    def accept_unaccepted_minions(self):
        minions = self.salt_api.list_all_unaccepted_minions()
        for minion in minions:
            self.salt_api.accept_minion(minion)
