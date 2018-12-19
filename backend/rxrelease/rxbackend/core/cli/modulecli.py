from ..restapi.REST_modules import REST_modules
from ..restapi.REST_wizard import REST_wizard
from ..restapi.REST_states import REST_states
from ..restapi.REST_hosts  import REST_hosts
from ..restapi.REST_statetypes import REST_statetypes
from ..restapi.REST_settings import REST_settings
from backend.rxrelease.rxbackend.configuration.globalsettings import ApiUserSettings,NetworkSettings,RemoteSettings

from .environment import Environment

import logging,sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
# TODO: de methodes in deze klasse zijn niet snakecase
class ModuleCLI:
    def __init__(self,auth_token):
     self.auth_token = auth_token
    def getEnvironment(self,hostname,statetype_name):

      hosts_api = REST_hosts(self.auth_token)
      statetypes_api = REST_statetypes(self.auth_token)

      host = hosts_api.getHostByHostname(hostname)
      statetype = statetypes_api.getStatetypeByName(statetype_name)
      settings_api = REST_settings(self.auth_token)


      if len(host) < 1:
          print("no host entry found that matches your description")
          return None;
      if len(statetype) < 1:
          print("no statetype entry found that matches your description")
          return None

      # get global settings
      global_kv_settings = settings_api.kv_settings_byname('Global Settings')
      # assuming we have a result we pick the first itemi in the index

      credentials_settings = settings_api.kv_credentials(host[0]['connectioncredentials'])
      #get the first
      state_credentials_settings = settings_api.kv_credentials_bycategory_id(statetype[0]["SettingsCategory"])[0]

      statetype_category = settings_api.category_by_id(statetype[0]["SettingsCategory"])

      kv_settings = settings_api.kv_settings(statetype[0]['SettingsCategory'])
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

      print(state_credentials_settings)
      print(credentials_settings)
      host_username = credentials_settings['username']
      host_password = credentials_settings['password']

      statetype_username = state_credentials_settings['username']
      statetype_password = state_credentials_settings['password']
      settings_dict['username'] = host_username
      settings_dict['password'] = host_password

      prefix = statetype_category['prefix']
      settings_dict[prefix + 'username'] = statetype_username
      settings_dict[prefix + 'password'] = statetype_password

      

      result = Environment(settings_dict,host,statetype,module)
      return result
    def initDb(self):
      modules_api = REST_modules(None)
      modules_api.getFiller()

    def initTestDb(self):
      modules_api = REST_modules(None)
      modules_api.getTestFiller()

    def listModules(self):
       modules_api = REST_modules(self.auth_token)
       modules = modules_api.getModules()
       return modules
    def activateModule(self,name):
     modules_api = REST_modules(self.auth_token)
     module =  modules_api.getModuleByName(name)
     # TODO: dit is best wel lelijk hier moeten we wat op vinden
     module = module[0]
     module['active'] = True
     modules_api.putModule(module)
    def createWizard(self,name,status):
     wizard_api = REST_wizard(self.auth_token)
     wizard_api.postWizard(name,status)
    def updateWizard(self,name,status):
      wizard_api = REST_wizard(self.auth_token)
      wizard_api.putWizard(name,status)
    def deleteHost(self,profiletype_name):
        hosts_api = REST_hosts(self.auth_token)
        host =   hosts_api.getHostByProfileType(profiletype_name)
        states_api = REST_states(self.auth_token)
        #logger.info(host)
        states_api.deleteStateByHostId(host[0]['id'])
        hosts_api.deleteHost(host[0]['id'])
