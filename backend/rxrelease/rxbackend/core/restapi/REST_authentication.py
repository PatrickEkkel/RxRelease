import requests
import json
from ...configuration.globalsettings import NetworkSettings

class REST_authentication:
    def __init__(self):
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port
    def postCredentials(self,username,password):
      serverAddress = self.backendlocation + '/rxbackend/api-token-auth/'
      payload = {'username': username,'password': password}
      #headers = {'content-type': 'application/json'}
      response = requests.post(serverAddress,data=payload)
      return response.json()
