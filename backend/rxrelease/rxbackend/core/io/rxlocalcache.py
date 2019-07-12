import sys
import logging
import zipfile

from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.io.rxfilestore import RxFileStore
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class RxLocalCache:

    def __init__(self):
        pass

    localcache = '.localcache/'

    @staticmethod
    def get_localcache():
        result = RxFileStore.get_instance()
        result.create_dir(RxLocalCache.localcache)
        result.set_context(RxLocalCache.localcache)
        return result

    def create_temp_archive(filename):
        location = RxLocalCache.get_localcache().get_current_context()
        zf = zipfile.ZipFile(location + '/' + filename + '.zip', mode='w')
        return zf
