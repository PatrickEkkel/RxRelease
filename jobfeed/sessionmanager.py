from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication

class Session:
    def __init__(self,auth_token):
        self.auth_token = auth_token

class SessionManager:
    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.session = Session(None)

    def login(self):
     authenticationApi = REST_authentication()
     token_result = authenticationApi.postCredentials(self.username,self.password)
     if 'token' not in token_result:
         print("Token could not be retrieved")
         sys.exit()
     else:
      self.session = Session(token_result['token'])
    def get_session(self):
     return self.session
