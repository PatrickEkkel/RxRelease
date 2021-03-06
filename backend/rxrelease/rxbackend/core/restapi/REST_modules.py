import requests
import json
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings

class REST_modules(REST_base):

 def __init__(self,auth_token):
     super().__init__(auth_token)
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def getModules(self):
     serverAddress = self.backendlocation + '/rxbackend/modules/'
     response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
     result = response.json()
     return result

 def getModuleByName(self,name):
     serverAddress = self.backendlocation + '/rxbackend/modules/search/?name=' + name
     response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
     result = response.json()
     return result

 def getSaltFiller(self):
     serverAddress = self.backendlocation + '/rxbackend/saltfiller'
     response = requests.get(serverAddress)

 def getTestFiller(self):
     serverAddress = self.backendlocation + '/rxbackend/testfiller'
     response = requests.get(serverAddress)

 def getFiller(self):
     serverAddress = self.backendlocation + '/rxbackend/filler'
     response = requests.get(serverAddress)

 def putModule(self,module):
     serverAddress = self.backendlocation + '/rxbackend/modules/' + str(module['id']) + '/'
     headers = {'content-type': 'application/json'}
     headers.update(self.getAuthTokenHeader())
     response = requests.put(serverAddress,data=json.dumps(module),headers=headers)
