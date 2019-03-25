import logging,sys,os
from rxbackend.rxsalt.api.salt_api import SaltApi
from rxbackend.rxsalt.restapi.REST_minions import REST_minions
from rxbackend.rxsalt.api.salt_command import SaltDataRoot

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SaltService:

    def __init__(self, ssh_connection, salt_connection, auth_token):
        self.salt_api = SaltApi(ssh_connection, salt_connection)
        self._auth_token = auth_token

    def execute_formula(self, formula_name):

        formulas_dir = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..','formulas'))
        # first get the state we want to apply and sync it to the master
        self.salt_api.sync_formula(formulas_dir + "/" + formula_name + "/init.sls")
        self.salt_api.apply_state(formula_name)

    def accept_minion(self, host):
        minions = self.salt_api.list_all_unaccepted_minions()
        for minion in minions:
            if minion == host['hostname']:
                logger.debug("found minion with id " + host['hostname'] + ' accepting key')
                result = self.salt_api.accept_minion(minion)

                salt_result = SaltDataRoot(result)
                if salt_result.get_data(0).get_success() == True:
                    logger.debug("accepting minion succesfull register minion  " + minion + " in the backend")

                    minion_api = REST_minions(self._auth_token)
                    # This is the first time we post an object from a statehandler context,
                    minion_dict = {}
                    minion_dict['host'] = host['id']
                    minion_dict['minion_id'] = minion
                    minion_dict['accepted'] = True
                    minion_api.post_minion(minion_dict)
                    return True
                else:
                    logger.debug("accepting minion " + minion  + " failed")
                    # TODO: schrijf dit weg in de uniforme logger (die nog niet bestaat)
                    # Op een later tijdstip willen we misschien het object updaten met een rejected status
                    return False

        if result is None:
            logger.error('no salt-minion found with hostname: ' + host['hostname'] + ' that has unaccepted keys')
            return False

    def accept_unaccepted_minions(self):
        minions = self.salt_api.list_all_unaccepted_minions()
        for minion in minions:
            self.salt_api.accept_minion(minion)
