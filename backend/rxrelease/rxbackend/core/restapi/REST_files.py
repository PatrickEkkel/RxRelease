import requests
import json
import os
import ntpath
from urllib import request
from urllib.request import urlopen

from ...core.restapi.REST_base import REST_base
from ...configuration.globalsettings import NetworkSettings


class REST_files(REST_base):

 def __init__(self,auth_token):
     super().__init__(auth_token)
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

 def post_filedata(self,file_path):

  serverAddress = self.backendlocation + '/rxbackend/files/upload/'
  print(serverAddress)
  file =  open(file_path,'rb')

  import requests
  files = {'file': open(file_path, 'rb')}

  filename = ntpath.basename(file_path)
  custom_headers = { 'Authorization': 'Token ' + self.auth_token,
   'Content-Disposition': 'form-data; name="'
    + file_path
    + '"; filename="'
    + filename
    + '"',
    'Content-Length': str(os.stat(file_path).st_size),
    'charset': 'UTF-8'  }

  r = requests.put(serverAddress,headers=custom_headers, files=files)
  print(r.text)

  #theRequest = request.Request(serverAddress, file, self.getAuthTokenHeader(),method='PUT')
  #urlopen(theRequest)

  #response = requests.post(serverAddress, headers=self.getAuthTokenHeader(), files=files)
  #result = response.json()
  return None
  #return result
