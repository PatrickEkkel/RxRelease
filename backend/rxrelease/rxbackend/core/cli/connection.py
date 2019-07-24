from ...configuration.globalsettings import ApiUserSettings,NetworkSettings,RemoteSettings
from ..restapi.REST_authentication import REST_authentication
from ..jobs.zmq.scheduler_service import SchedulerService, ActionFactory
from .modulecli import ModuleCLI

class Connection:

    c = None
    
    def __init__(self):
        self.module_cli_api = None
        self.action_factory = ActionFactory()
        self.scheduler_service = SchedulerService()
    @staticmethod
    def get_connection():
        global connection
        if Connection.c is None:
            Connection.c = Connection()
            return Connection.c
        else:
            return Connection.c

    def connect(self):
         auth_token = None

         api_user_settings_username = ApiUserSettings.username
         api_user_settings_password = ApiUserSettings.password

         try:
          token_result = REST_authentication().postCredentials(api_user_settings_username,api_user_settings_password)
          auth_token = token_result['token']
          self.module_cli_api = ModuleCLI(auth_token)
         except:
          print('CLI connection with backend could not be established')
         if auth_token is not None:
          print("CLI connection with backend successfull")
