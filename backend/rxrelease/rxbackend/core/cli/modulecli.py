from ..restapi.REST_modules import REST_modules
class ModuleCLI:
    def __init__(self,auth_token):
     self.auth_token = auth_token
    def activateModule(self,name):
     modules_api = REST_modules(self.auth_token)
     module =  modules_api.getModuleByName(name)
     # TODO: dit is best wel lelijk hier moeten we wat op vinden
     module = module[0]
     module['active'] = True
     modules_api.putModule(module)
