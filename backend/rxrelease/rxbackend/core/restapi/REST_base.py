import requests
import json
from ...configuration.globalsettings import NetworkSettings

class REST_base:

    def __init__(self,auth_token):
     self.auth_token = auth_token
    def getAuthTokenHeader(self):
        return { 'Authorization': 'Token ' + self.auth_token}
