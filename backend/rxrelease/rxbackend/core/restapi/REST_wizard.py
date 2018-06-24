import requests
import logging,sys
import json
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class REST_wizard(REST_base):
 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def getWizardState(self,wizard_id):
    serverAddress = self.backendlocation + '/rxbackend/wizardstatus/search/?wizard_id=' + wizard_id
    response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
    logger.info("wizard search respose " + str(response))
    result = response.json()
    return result

 def putWizard(self,wizard_id,status):
    wizard_state = self.getWizardState(wizard_id)
    logger.info("wizard state contents: " + str(wizard_state))
    serverAddress = self.backendlocation + '/rxbackend/wizardstatus/' + str(wizard_state[0]['id']) + '/'
    headers = {'content-type': 'application/json'}
    wizard = {'wizard_id': wizard_id,'wizard_status': status}
    headers.update(self.getAuthTokenHeader())
    response = requests.put(serverAddress,data=json.dumps(wizard),headers=headers)
 def postWizard(self,name,status):
  serverAddress = self.backendlocation + '/rxbackend/wizardstatus/'
  headers = {'content-type': 'application/json'}

  wizard = {'wizard_id': name,'wizard_status': 'NEW'}
  headers.update(self.getAuthTokenHeader())
  response = requests.post(serverAddress,data=json.dumps(wizard),headers=headers)
