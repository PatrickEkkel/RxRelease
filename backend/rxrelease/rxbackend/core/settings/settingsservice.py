from ..dao.settingsdao import SettingsDao


class SettingsService:

    def getHostSettingsByHost(self, host):
        settingsDao = SettingsDao()
        settings = settingsDao.getSettingsByCategory(host.hostSettings)
        result = {}
        if settings is not None:
            for setting in settings:
                result[setting.key] = setting.value
            return result

    def getSettingsByCategoryname(self, name):
        settingsDao = SettingsDao()
        settings = settingsDao.getSettingsByCategoryName(name)
        return settings

    def getHostCredentialSettingsByStatetype(self, statetype):
        settingsDao = SettingsDao()
        settings = settingsDao.getCredentialsByCategory(statetype.SettingsCategory)
        return settings

    def get_credentials_by_settings_id(self, id):
        settingsDao = SettingsDao()

        return settingsDao.getCredentialSettingsById(id)

    def getHostSettingsByStatetype(self, statetype):
        settingsDao = SettingsDao()
        settings = settingsDao.getSettingsByCategory(statetype.state_settings)
        return settings
        # turn the kv pair into a dict, because we need easy access for searching an matching


def getHostSetting(self, key, host):
    # First see if the settings are available for the host
    settingsDao = SettingsDao()
    settings = self.getHostSettingsByHost(host)
    if key in settings:
        return settings[key]
    else:
        # fallback on global settings
        settings = self.getSettingsByCategoryname('Global Settings')
        return settings[key]
