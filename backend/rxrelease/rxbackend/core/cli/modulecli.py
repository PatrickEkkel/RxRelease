from ..restapi.REST_modules import REST_modules
from ..restapi.REST_wizard import REST_wizard
from ..restapi.REST_states import REST_states
from ..restapi.REST_hosts  import REST_hosts

import logging,sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class ModuleCLI:
    def __init__(self,auth_token):
     self.auth_token = auth_token
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
