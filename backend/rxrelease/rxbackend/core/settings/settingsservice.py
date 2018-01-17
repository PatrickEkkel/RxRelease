from ..dao.settingsdao import SettingsDao
class SettingsService:

 def getHostSettingsByHost(self,host):
     settingsDao = SettingsDao()
     settings = settingsDao.getSettingsByCategory(host.hostSettings)
     result = {}
     if settings is not None:
      for setting in settings:
       result[setting.key] = setting.value
      return result

 def getHostSettingsByStatetype(self,statetype):
    settingsDao = SettingsDao()
    settings =  settingsDao.getSettingsByCategory(statetype.SettingsCategory)
    return settings
    # turn the kv pair into a dict, because we need easy access for searching an matching
