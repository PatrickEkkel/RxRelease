import requests
import json
from ...configuration.globalsettings import NetworkSettings

class REST_states:

 def __init__(self):
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def putState(self,state):
  serverAddress = self.backendlocation + '/rxbackend/states/' + str(state['id']) + '/'
  headers = {'content-type': 'application/json'}
  response = requests.put(serverAddress,data=json.dumps(state),headers=headers)
  print("Server response")
  print(response.text)
 def getStateByHostAndStateTypeId(self,host_id,statetype_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id) + "&" + "statetype_id=" + str(statetype_id)
  response = requests.get(serverAddress)
  result = response.json()
  return result
 def getStateByHostAndStateId(self,host_id,state_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id) + "&" + "state_id=" + str(state_id)
  response = requests.get(serverAddress)
  result = response.json()
  return result
