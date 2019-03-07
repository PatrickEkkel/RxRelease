from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.io.rxfilestore import RxFileStore

class RxLocalStore:
    localstore = '.localstore'
    @staticmethod
    def get_localstore():
        result = RxFileStore.get_instance()
        result.set_context(localstore)
        return result
    def get_or_create_dir_from_localstore(dir):
        result = RxFileStore.get_instance()
        result.set_context(localstore)
        subdirs = dir.split('/')
        current_context = ''
        for subdir in subdirs:
            result.create_dir(subdir)
            current_context += subdir + '/'
            result.set_context(current_context)

        result.create_dir(dir)
        result.set_context(localstore + '/' + dir)
        return result
