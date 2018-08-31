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
# TODO: REST_hosts is niet consistent met python en snakecase
class REST_hosts(REST_base):

 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port
 def getHostByProfileType(self,profiletype_name):
   serverAddress = self.backendlocation + '/rxbackend/hosts/search/byprofiletype/?profiletype=' + profiletype_name
   response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
   result = response.json()
   return result
 def getHostByHostname(self,hostname):
    serverAddress = self.backendlocation + '/rxbackend/hosts/search/byhostname/?hostname=' + hostname
    response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
    result = response.json()
    return result

 def deleteHost(self,host_id):
   serverAddress = self.backendlocation + '/rxbackend/hosts/' + str(host_id)
   response = requests.delete(serverAddress,headers=self.getAuthTokenHeader())
   logging.info(response)
   return response
