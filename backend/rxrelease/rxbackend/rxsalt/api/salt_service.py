import logging
import sys
import os
from datetime import datetime
from rxbackend.rxsalt.api.salt_api import SaltApi
from rxbackend.rxsalt.restapi.REST_minions import REST_minions
from rxbackend.rxsalt.restapi.REST_saltlogs import REST_saltlogs
from rxbackend.rxsalt.api.salt_command import SaltDataRoot

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SaltService:
    APPLY_STATE = 'APPLY_STATE'
    ACCEPT_MINION = 'ACCEPT_MINION'

    def __init__(self, ssh_connection, salt_connection, auth_token):
        self.salt_api = SaltApi(ssh_connection, salt_connection)
        self._auth_token = auth_token

    def execute_formula(self, formula_name, target, test):

        # first get the state we want to apply and sync it to the master
        self.salt_api.sync_formula(formula_name)
        salt_response = self.salt_api.apply_state(formula_name, target, test)
        salt_data = SaltDataRoot(salt_response)
        saltlogs_api = REST_saltlogs(self._auth_token)
        saltminion_api = REST_minions(self._auth_token)
        targeted_minion = saltminion_api.get_minion_by_name(target)
        for i in range(salt_data.get_size()):
            current_data_element = salt_data.get_data(i)
            for x in range(current_data_element.get_states_size()):
                salt_log = {'comment': current_data_element.get_states(x).get_comment(),
                            'saltstate': current_data_element.get_states(x).get_name(),
                            'sls': current_data_element.get_states(x).get_sls(),
                            'duration': current_data_element.get_states(x).get_duration(),
                            'start_date': str(datetime.now().strftime('%Y-%m-%d')),
                            'start_time': current_data_element.get_states(x).get_start_time(),
                            'result': str(current_data_element.get_states(x).get_result()),
                            'run_num': current_data_element.get_states(x).get_run_num(),
                            'changes': '',
                            'type': self.APPLY_STATE,
                            'test': test,
                            'minion': targeted_minion[0]['id']
                            }
                saltlogs_api.post_log(salt_log)

    def accept_minion(self, host):
        minions = self.salt_api.list_all_unaccepted_minions()
        result = None
        for minion in minions:
            if minion == host['hostname']:
                logger.debug("found minion with id " + host['hostname'] + ' accepting key')
                result = self.salt_api.accept_minion(minion)

                salt_result = SaltDataRoot(result)
                if salt_result.get_data(0).get_success() == True:
                    logger.debug(
                        "accepting minion succesfull register minion  " + minion + " in the backend")

                    minion_api = REST_minions(self._auth_token)
                    # This is the first time we post an object from a statehandler context,
                    minion_dict = {}
                    minion_dict['host'] = host['id']
                    minion_dict['minion_id'] = minion
                    minion_dict['accepted'] = True
                    minion_api.post_minion(minion_dict)
                    return True
                else:
                    logger.debug("accepting minion " + minion + " failed")
                    # TODO: schrijf dit weg in de uniforme logger (die nog niet bestaat)
                    # Op een later tijdstip willen we misschien het object updaten met een rejected status
                    return False

        if result is None:
            logger.error('no salt-minion found with hostname: ' + host[
                'hostname'] + ' that has unaccepted keys')
            return False

    def accept_unaccepted_minions(self):
        minions = self.salt_api.list_all_unaccepted_minions()
        for minion in minions:
            self.salt_api.accept_minion(minion)
