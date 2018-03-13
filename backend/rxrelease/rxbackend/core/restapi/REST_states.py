import requests
import json
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings

class REST_states(REST_base):

 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def putState(self,state):
  serverAddress = self.backendlocation + '/rxbackend/states/' + str(state['id']) + '/'
  headers = {'content-type': 'application/json'}
  headers.update(self.getAuthTokenHeader())
  response = requests.put(serverAddress,data=json.dumps(state),headers=headers)
  print("Server response")
  print(response.text)
 def getStateByHostAndStateTypeId(self,host_id,statetype_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id) + "&" + "statetype_id=" + str(statetype_id)
  #print(self.auth_token)
  #headers = { 'Authorization': 'Token ' + self.auth_token}
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result
 def getStateByHostAndStateId(self,host_id,state_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id) + "&" + "state_id=" + str(state_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result
