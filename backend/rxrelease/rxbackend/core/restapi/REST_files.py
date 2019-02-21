import requests
import json
from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings


class REST_files(REST_base):

 def __init__(self,auth_token):
     super().__init__(auth_token)
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def post_filedata(self,file_path):
  serverAddress = self.backendlocation + '/rxbackend/files/upload'
  files = {'upload_file': open(file_path,'rb')}

  response = requests.put(serverAddress,headers=self.getAuthTokenHeader(),files=files)
  result = response.json()
  return result
