from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication



class SessionManager:
    def __init__(self,username,password):
        self.username = username
        self.password = password

    def login(self):
     authenticationApi = REST_authentication()
     token_result = authenticationApi.postCredentials(self.username,self.password)
     if 'token' not in token_result:
         print("Token could not be retrieved")
         sys.exit()
