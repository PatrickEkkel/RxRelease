import requests
import json
import logging,sys
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class REST_states(REST_base):

 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port
 def deleteStateByHostId(self,host_id):
   serverAddress = self.backendlocation + '/rxbackend/states/'
   headers = {'content-type': 'application/json'}
   headers.update(self.getAuthTokenHeader())
   states_to_be_deleted = self.getStatesByHostId(host_id)
   for state in states_to_be_deleted:
       response = requests.delete(serverAddress + str(state['id']) + '/',headers=headers)
       logger.info("deleted state id: " + str(state['id']) + str(response))

 def putSimpleState(self,simple_state):
  serverAddress = self.backendlocation + '/rxbackend/simplestates/' + str(simple_state['id']) + '/'
  headers = {'content-type': 'application/json'}
  headers.update(self.getAuthTokenHeader())
  response = requests.put(serverAddress,data=json.dumps(simple_state),headers=headers)

 def putRepeatableState(self,repeatable_state):
  serverAddress = self.backendlocation + '/rxbackend/repeatablestates/' + str(repeatable_state['id']) + '/'
  headers = {'content-type': 'application/json'}
  headers.update(self.getAuthTokenHeader())
  response = requests.put(serverAddress,data=json.dumps(repeatable_state),headers=headers)


 def putState(self,state):
  serverAddress = self.backendlocation + '/rxbackend/states/' + str(state['id']) + '/'
  headers = {'content-type': 'application/json'}
  headers.update(self.getAuthTokenHeader())
  response = requests.put(serverAddress,data=json.dumps(state),headers=headers)

 def getStateByHostAndStateTypeId(self,host_id,statetype_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id) + "&" + "statetype_id=" + str(statetype_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result

 def getStatesByHostId(self,host_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result

 def getStateByHostAndStateId(self,host_id,state_id):
  serverAddress = self.backendlocation + '/rxbackend/states/search/?host_id=' + str(host_id) + "&" + "state_id=" + str(state_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result
