import requests
import json
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings


class REST_wizard(REST_base):
 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def postWizard(self,name,status):
  serverAddress = self.backendlocation + '/rxbackend/wizardstatus/'
  headers = {'content-type': 'application/json'}

  wizard = {'wizard_id': name,'wizard_status': 'NEW'}
  headers.update(self.getAuthTokenHeader())
  response = requests.post(serverAddress,data=json.dumps(wizard),headers=headers)
