import requests
import json
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings



class REST_settings(REST_base):
 def __init__(self,auth_token):
  super().__init__(auth_token)
  self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def kv_credentials(self,credentials_id):
  serverAddress = self.backendlocation + '/rxbackend/settings/credentials/' + str(credentials_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result

 def kv_credentials_bycategory_id(self,category_id):
  serverAddress = self.backendlocation + '/rxbackend/settings/credentials/search/?category_id=' + str(category_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result

 def category_by_id(self,category_id):
  serverAddress = self.backendlocation + '/rxbackend/settingscategory/' + str(category_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result

 def kv_settings_byname(self,category_name):
  serverAddress = self.backendlocation + '/rxbackend/settings/search/?category_name=' + str(category_name)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result

 def kv_settings(self,category_id):
  serverAddress = self.backendlocation + '/rxbackend/settings/search/?category_id=' + str(category_id)
  response = requests.get(serverAddress,headers=self.getAuthTokenHeader())
  result = response.json()
  return result
