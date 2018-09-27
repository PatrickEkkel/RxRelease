import logging,sys
from ...models import CredentialsSetting
from ...models import KVSetting
from ...models import SettingsCategory

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SettingsDao:

    def __init__(self):
        pass
    def getCredentialSettingsById(self,id):
        credential_setting_id = id
        credentials =  CredentialsSetting.objects.get(id = credential_setting_id)

        return credentials;

    def getSettingsByCategoryName(self,category_name):
        kvsettings = KVSetting.objects.filter(category__name=category_name)
        #SettingsCategory.objects.filter(name=category_name)

        return kvsettings
    def getCredentialsByCategory(self,category):
      try:
       kvsettings = CredentialsSetting.objects.get(category = category)
      except CredentialsSetting.DoesNotExist:
       kvsettings = None
       logger.error("Trying to get Settings by a Category that does not exists with name " + str(category))
      return kvsettings

    def getSettingsByCategory(self,category):
       try:
        kvsettings = KVSetting.objects.filter(category = category)
       except KVSetting.DoesNotExist:
        kvsettings = None
        logger.error("Trying to get a Setting that does not exists with id " + str(category))
       return kvsettings

    def getKVSettingsByName(self,name):
        setting_name = name
        setting = KVSetting.objects.get(key = setting_name)
        return setting
