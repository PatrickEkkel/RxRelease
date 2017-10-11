import requests
import json
from ...configuration.globalsettings import NetworkSettings

class RequestSender:

    def __init__(self):
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

    def updateState(self,state):
         serverAddress = self.backendlocation + '/rxbackend/states/' + state_id
         headers = {'content-type': 'application/json'}
         response = request.put(serverAddress,data=str(state),headers=headers)
         
    def getState(self,state_id):
        serverAddress = self.backendlocation + '/rxbackend/states/' + state_id
        response = requests.get(serverAddress)
        result = response.json()
        return result
    def sendHandleHoststateRequest(self,request):
     serverAddress= self.backendlocation +  '/rxbackend/statetypes/handlehoststate'
     print(str(request))
     headers = {'content-type': 'application/json'}
     response =  requests.post(serverAddress,data=str(request),headers=headers)
     print(response.status_code, response.reason)
