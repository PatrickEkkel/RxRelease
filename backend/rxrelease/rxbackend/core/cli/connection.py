from ...configuration.globalsettings import ApiUserSettings,NetworkSettings,RemoteSettings
from ..restapi.REST_authentication import REST_authentication


class Connection:
    def __init__(self):
        pass
    def connect(self):
         auth_token = None

         api_user_settings_username
         api_user_settings_password
         module_cli_api
         api_user_settings_username = ApiUserSettings.username
         api_user_settings_password = ApiUserSettings.password


         try:
          token_result = REST_authentication().postCredentials(api_user_settings_username,api_user_settings_password)
          auth_token = token_result['token']
          module_cli_api = ModuleCLI(auth_token)
         except:
          print('CLI connection with backend could not be established')
         if auth_token is not None:
          print("CLI connection with backend successfull")
