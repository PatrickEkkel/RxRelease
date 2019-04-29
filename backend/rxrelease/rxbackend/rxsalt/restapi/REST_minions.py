import requests
import json


from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings

class REST_minions(REST_base):

    def __init__(self,auth_token):
     super().__init__(auth_token)
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port


    def get_minion_by_name(self,name):
        serverAddress = self.backendlocation + '/rxbackend/rxsalt/minions/search/?minion_id=' + str(name)
        response = requests.get(serverAddress, headers=self.getAuthTokenHeader())
        result = response.json()
        return result


    def post_minion(self,minion):
          serverAddress= self.backendlocation +  '/rxbackend/rxsalt/minions/'
          headers = {'content-type': 'application/json'}
          headers.update(self.getAuthTokenHeader())
          response =  requests.post(serverAddress,data=json.dumps(minion),headers=headers)
