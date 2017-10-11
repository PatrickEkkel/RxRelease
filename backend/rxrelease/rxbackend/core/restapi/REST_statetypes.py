import requests
import json
from ...configuration.globalsettings import NetworkSettings


class REST_statetypes:

 def __init__(self):
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def postHandleHostState(self,request):
  serverAddress= self.backendlocation +  '/rxbackend/statetypes/handlehoststate'
  print(str(request))
  headers = {'content-type': 'application/json'}
  response =  requests.post(serverAddress,data=str(request),headers=headers)
  print(response.status_code, response.reason)
