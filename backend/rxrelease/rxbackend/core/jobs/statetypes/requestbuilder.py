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

        handler_request = HandlerRequest()

        handler_request.setIpAddress(host.ipaddress)
        handler_request.setHostId(host.id)
        handler_request.setStateTypeId(statetype.id)
        handler_request.setHandlerCommand(statetype.handler)

        statetype_settings_category = statetype.state_settings

        global_host_settings = self.settingsService.getSettingsByCategoryname('Global Settings')

        statetype_settings = self.settingsService.getHostSettingsByStatetype(statetype)
        logger.debug("prefix: " + str(statetype_settings_category.prefix))
        logger.debug("statetypeSettings: " + str(statetype_settings))
        host_only_settings = self.settingsService.getHostSettingsByHost(host)

        # the host settings that will be selected
        # problem because we still need a list of host settings that are expected for this
        # type of host call
        selected_settings = {}

        if global_host_settings is not None:
            # first go through the list of global settings
            for globalSetting in global_host_settings:
                if host_only_settings is not None and host_only_settings.get(
                        globalSetting.key) is not None:
                    selected_settings[globalSetting.key] = host_only_settings[globalSetting.key]
                else:
                    selected_settings[globalSetting.key] = globalSetting.value
        else:
            logger.error("No global settings found")

        if statetype_settings is not None:
            for statetypeSetting in statetype_settings:
                logger.debug(f"adding statetype setting with key: {statetypeSetting.key}")
                selected_settings[statetypeSetting.key] = statetypeSetting.value

        logger.debug("globalHostSettings: " + str(global_host_settings))
        logger.debug("selectedSettings: " + str(selected_settings))

        # TODO: new type definen voor variabelen van state
        # Dit is specefiek aan de statetype

        credentials = self.settingsDao.getCredentialSettingsById(host.connectioncredentials_id)

        self.kvbuilder.addKeyValPair("username", credentials.username)
        self.kvbuilder.addKeyValPair("password", credentials.password)
        state_credentials = None
        logger.debug("loaded statetype" + str(statetype.__dict__))
        if statetype.connection_credentials is not None:
            state_credentials = self.settingsService.get_credentials_by_category_id(statetype.connection_credentials.id)
            prefix = state_credentials.category.prefix
            logger.debug(f"state credentials {state_credentials}")
            logger.debug(f"prefix: {prefix}")

            if state_credentials is not None:
                logger.debug("state credentials found")
                self.kvbuilder.addKeyValPair(state_credentials.category.prefix + '-username',
                                        state_credentials.username)
                self.kvbuilder.addKeyValPair(state_credentials.category.prefix + '-password',
                                    state_credentials.password)

        for key, value in selected_settings.items():
            self.kvbuilder.addKeyValPair(key, value)

        handler_request.setKeyValList(self.kvbuilder.build())
        return handler_request
