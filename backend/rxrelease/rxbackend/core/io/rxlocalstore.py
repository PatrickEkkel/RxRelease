from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings

class RxLocalStore:

    def __init__(self):
        localuser=LocalSettings.localuser
        remoteuser=RemoteSettings.remoteuser
        self.location = localstore_path = '/home/' + remoteuser + '/.localstore/'
