import types
from ..restapi.REST_modules import REST_modules
from ..restapi.REST_wizard import REST_wizard
from ..restapi.REST_states import REST_states
from ..restapi.REST_hosts import REST_hosts
from ..restapi.REST_files import REST_files
from ..restapi.REST_statetypes import REST_statetypes
from ..restapi.REST_settings import REST_settings

# This should not be here, consider giving all salt stuff their own modulecli
from ...rxsalt.restapi.REST_formulas import REST_formula

from backend.rxrelease.rxbackend.configuration.globalsettings import ApiUserSettings, \
    NetworkSettings, RemoteSettings

from .environment import Environment

import logging, sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


# TODO: de methodes in deze klasse zijn niet snakecase
class ModuleCLI:
    def __init__(self, auth_token):
        self.auth_token = auth_token

    def upload_file(self, file_path):
        files_api = REST_files(self.auth_token)
        return files_api.post_filedata(file_path)

    def getEnvironment(self, hostname, statetype_name):

        hosts_api = REST_hosts(self.auth_token)
        statetypes_api = REST_statetypes(self.auth_token)

        host = hosts_api.get_host_by_hostname(hostname)
        statetype = statetypes_api.getStatetypeByName(statetype_name)
        settings_api = REST_settings(self.auth_token)

        if len(host) < 1:
            print("no host entry found that matches your description")
            return None;
        if len(statetype) < 1:
            print("no statetype entry found that matches your description")
            return None

        # get global settings
        global_kv_settings = settings_api.get_kv_settingscategory_byname('Global Settings')
        # assuming we have a result we pick the first itemi in the index
        state_credentials_settings = None
        if statetype[0]['connection_credentials'] is not None:
            state_credentials_settings = settings_api.kv_credentials_bycategory_id(statetype[0]['connection_credentials'])[0]

        credentials_settings = settings_api.kv_credentials(host[0]['connectioncredentials'])

        # get the first
        state_credentials_settingsCategory = settings_api.kv_credentials_bycategory_id(
            statetype[0]["state_settings"])
        statetype_category = settings_api.category_by_id(statetype[0]["state_settings"])

        kv_settings = settings_api.kv_settings(statetype[0]['state_settings'])
        module = statetype[0]['module']
        settings_dict = {}
        settings_dict['dryrun'] = 'False'
        settings_dict['remoteuser'] = RemoteSettings.remoteuser

        for kv_setting in global_kv_settings:
            key = kv_setting['key']
            value = kv_setting['value']
            settings_dict[key] = value

        for kv_setting in kv_settings:
            key = kv_setting['key']
            value = kv_setting['value']
            settings_dict[key] = value

        host_username = credentials_settings['username']
        host_password = credentials_settings['password']

        prefix = statetype_category['prefix']

        # TODO: hier null checks implementeren
        if state_credentials_settings is not None:
            statetype_username = state_credentials_settings['username']
            statetype_password = state_credentials_settings['password']
            if prefix:
                settings_dict[prefix + '-username'] = statetype_username
                settings_dict[prefix + '-password'] = statetype_password
            else:
                logger.debug('no prefix found, defaulting to standard username password')

        settings_dict['username'] = host_username
        settings_dict['password'] = host_password

        result = Environment(settings_dict, host, statetype, module)
        return result

    def initDb(self):
        modules_api = REST_modules(None)
        modules_api.getFiller()

    def initSaltDb(self):
        modules_api = REST_modules(None)
        modules_api.getSaltFiller()

    def initTestDb(self):
        modules_api = REST_modules(None)
        modules_api.getTestFiller()

    def listModules(self):
        modules_api = REST_modules(self.auth_token)
        modules = modules_api.getModules()
        return modules

    def activateModule(self, name):
        modules_api = REST_modules(self.auth_token)
        module = modules_api.getModuleByName(name)
        # TODO: dit is best wel lelijk hier moeten we wat op vinden
        module = module[0]
        module['active'] = True
        modules_api.putModule(module)

    def createWizard(self, name, status):
        wizard_api = REST_wizard(self.auth_token)
        wizard_api.postWizard(name, status)

    def update_wizard(self, name, status):
        wizard_api = REST_wizard(self.auth_token)
        wizard_api.putWizard(name, status)

    def getStatetypeByName(self, name):
        statetypes_api = REST_statetypes(self.auth_token)
        statetype = statetypes_api.getStatetypeByName(name)
        return statetype

    def set_state(self, hostname, statetype_name, status):
        hosts_api = REST_hosts(self.auth_token)
        statetypes_api = REST_statetypes(self.auth_token)
        states_api = REST_states(self.auth_token)

        host = hosts_api.get_host_by_hostname(hostname)
        statetype = statetypes_api.getStatetypeByName(statetype_name)

        if statetype[0]['jobtype'] == 'SIMPLE_STATE':
            if not isinstance(status, (bool)):
                print('Not a valid state for a Simple State, please supply a boolean parameter ')
                return None
            state = states_api.getStateByHostAndStateTypeId(host[0]['id'], statetype[0]['id'])
            simple_state = state[0]['simple_state']
            simple_state['installed'] = status
            states_api.putSimpleState(simple_state)
        print(statetype)

    def getHostByName(self, hostname):
        hosts_api = REST_hosts(self.auth_token)
        host = hosts_api.get_host_by_hostname(hostname)
        return host

    def get_credentials_by_category(self,category):
        settings_api = REST_settings(self.auth_token)
        category_id = settings_api.get_category_byname(category)[0]['id']
        settings = settings_api.kv_credentials_bycategory_id(category_id)
        return settings

    def get_setting_from_host(self, hostname, key):
        settings_api = REST_settings(self.auth_token)
        setting = settings_api.get_host_kv_settings_by_key(key, hostname)
        return setting

    def delete_host(self, profiletype_name):
        hosts_api = REST_hosts(self.auth_token)
        host = hosts_api.getHostByProfileType(profiletype_name)
        states_api = REST_states(self.auth_token)
        # logger.info(host)
        states_api.deleteStateByHostId(host[0]['id'])
        hosts_api.deleteHost(host[0]['id'])

    def create_salt_formula(self, formula):

        formulas_api = REST_formula(self.auth_token)
        formulas_api.post_formula(formula)
