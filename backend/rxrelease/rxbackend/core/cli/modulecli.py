from ..restapi.REST_modules import REST_modules
from ..restapi.REST_wizard import REST_wizard
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
