import uuid
import datetime
import sys
from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication

class Session:
    def __init__(self,auth_token,now):
        self.auth_token = auth_token
        self.session_start = now
        self.session_id = uuid.uuid4()

class SessionManager:
    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.session = Session(None,None)


    def login(self):
     authenticationApi = REST_authentication()
     token_result = authenticationApi.postCredentials(self.username,self.password)
     if 'token' not in token_result:
         print("Token could not be retrieved")
         sys.exit()
     else:
      now = datetime.datetime.now()
      now.strftime('%Y-%m-%dT%H:%M:%S') + ('-%02d' % (now.microsecond / 10000))
      self.session = Session(token_result['token'],now)
    def get_session(self):
     return self.session
