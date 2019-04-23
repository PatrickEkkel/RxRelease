import logging, sys
from .handlerrequest import HandlerRequest
from ...dao.hostdao import HostDao
from ...dao.settingsdao import SettingsDao
from ..api.keyvallistbuilder import KeyValListBuilder
from ....configuration.globalsettings import RemoteSettings
from ...settings.settingsservice import SettingsService

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class RequestBuilder:
    def __init__(self):
        self.kvbuilder = KeyValListBuilder()
        self.settingsDao = SettingsDao()
        self.settingsService = SettingsService()

        self.kvbuilder.addKeyValPair("remoteuser", RemoteSettings.remoteuser)
        self.kvbuilder.addKeyValPair("dryrun", "False")

    def build_request_with_state(self, state):
        host_dao = HostDao()
        host = host_dao.getHostById(state.host_id)
        return self.build_request_with_host_and_statetype(host, state.statetype)

    def build_request_with_host_and_statetype(self, host, statetype):

        handlerRequest = HandlerRequest()

        handlerRequest.setIpAddress(host.ipaddress)
        handlerRequest.setHostId(host.id)
        handlerRequest.setStateTypeId(statetype.id)
        handlerRequest.setHandlerCommand(statetype.handler)

        statetypeSettingsCategory = statetype.SettingsCategory

        globalHostSettings = self.settingsService.getSettingsByCategoryname('Global Settings')

        statetypeSettings = self.settingsService.getHostSettingsByStatetype(statetype)
        logger.debug("prefix: " + str(statetypeSettingsCategory.prefix))
        logger.debug("statetypeSettings: " + str(statetypeSettings))
        hostOnlySettings = self.settingsService.getHostSettingsByHost(host)

        # the host settings that will be selected
        # problem because we still need a list of host settings that are expected for this type of host call
        selectedSettings = {}

        if globalHostSettings is not None:
            # first go through the list of global settings
            for globalSetting in globalHostSettings:
                if hostOnlySettings is not None and hostOnlySettings.get(
                        globalSetting.key) is not None:
                    selectedSettings[globalSetting.key] = hostOnlySettings[globalSetting.key]
                else:
                    selectedSettings[globalSetting.key] = globalSetting.value
        else:
            logger.error("No global settings found")

        if statetypeSettings is not None:
            for statetypeSetting in statetypeSettings:
                selectedSettings[statetypeSetting.key] = statetypeSetting.value

        logger.debug("globalHostSettings: " + str(globalHostSettings))
        logger.debug("selectedSettings: " + str(selectedSettings))

        # TODO: new type definen voor variabelen van state
        # Dit is specefiek aan de statetype

        credentials = self.settingsDao.getCredentialSettingsById(host.connectioncredentials_id)

        self.kvbuilder.addKeyValPair("username", credentials.username)
        self.kvbuilder.addKeyValPair("password", credentials.password)
        state_credentials = self.settingsService.getHostCredentialSettingsByStatetype(statetype)

        if state_credentials is not None:
            logger.debug("state credentials found")
            self.kvbuilder.addKeyValPair(statetypeSettingsCategory.prefix + 'username',
                                    state_credentials.username)
            self.kvbuilder.addKeyValPair(statetypeSettingsCategory.prefix + 'password',
                                    state_credentials.password)

        for key, value in selectedSettings.items():
            self.kvbuilder.addKeyValPair(key, value)

        handlerRequest.setKeyValList(self.kvbuilder.build())
        return handlerRequest
