from ....core.restapi.REST_base import REST_base
from ....configuration.globalsettings import NetworkSettings

class REST_minions(REST_base):

    def __init__(self,auth_token):
     super().__init__(auth_token)
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

    def post_minion(self):
        pass
