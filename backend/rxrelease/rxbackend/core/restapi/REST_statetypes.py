import requests
import json
from ...configuration.globalsettings import NetworkSettings
from ...core.restapi.REST_base import REST_base


class REST_statetypes(REST_base):

 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def postHandleHostState(self,request):
  serverAddress= self.backendlocation +  '/rxbackend/statetypes/handlehoststate'
  print("wat sturen we nu naar de server")
  print(str(request))
  headers = {'content-type': 'application/json'}
  headers.update(self.getAuthTokenHeader())
  response =  requests.post(serverAddress,data=str(request),headers=headers)
  print(response.text)
  print(response.status_code, response.reason)
