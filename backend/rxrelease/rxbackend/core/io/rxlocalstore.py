import sys
import logging
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.io.rxfilestore import RxFileStore
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class RxLocalStore:

    localstore = '.localstore'

    @staticmethod
    def get_localstore():
        result = RxFileStore.get_instance()
        result.set_context(localstore)
        return result

    def get_or_create_dir_from_localstore(dir):
        result = RxFileStore.get_instance()
        result.set_context(RxLocalStore.localstore)
        subdirs = dir.split('//')
        current_context = ''
        for subdir in subdirs:
            logging.debug("create directory: " + subdir)
            result.create_dir(subdir)
            current_context += subdir + '/'
            result.set_context(current_context)

        result.create_dir(dir)
        result.set_context(RxLocalStore.localstore + '/' + dir)
        return result
