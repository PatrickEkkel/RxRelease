import logging,sys
from handlerrequest import HandlerRequest
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

    def buildRequest(self,state):
     hostDao = HostDao()
     settingsDao = SettingsDao()
     settingsService = SettingsService()
     host = hostDao.getHostById(state.host_id)
     # TODO: dit moeten we via de service laten lopen
     credentials = settingsDao.getCredentialSettingsById(host.connectioncredentials_id)

     # Dit stukje is generiek
     handlerRequest = HandlerRequest()
     handlerRequest.setIpAddress(state.host.ipaddress)
     handlerRequest.setHostId(state.host_id)
     handlerRequest.setStateTypeId(state.statetype_id)
     handlerRequest.setHandlerCommand(state.statetype.handler)
     # first get the global setting for this statetype by getting the vars defined in the specific category
     statetypeSettings =  state.statetype.SettingsCategory
     # this should always yield results, the filler that will be provided with the installer should always provide a set of default keyvalue pairs
     globalHostSettings = settingsService.getHostSettingsByStatetype(state.statetype)
     hostOnlySettings = settingsService.getHostSettingsByHost(state.host)

     # the host settings that will be selected
     # problem because we still need a list of host settings that are expected for this type of host call
     selectedSettings = {}
     if globalHostSettings is not None:
     # first go through the list of global settings
      for globalSetting in globalHostSettings:
         if hostOnlySettings is not None and hostOnlySettings.get(globalSetting.key) is not None:
          selectedSettings[globalSetting.key] = hostOnlySettings[globalSetting.key]
         else:
          selectedSettings[globalSetting.key] = globalSetting.value
     else:
      logger.error("No global settings found for statetype: " + str(state.statetype))
     # keyvalue pairs moeten dus opgehaald worden aan de hand van de statetype,
     # maar omdat we zitten met een configuratie per host moeten we de werkelijke settings uit de host halen

     # We maken hierbij een onderscheid tussen host data (specefiek voor de host die we afhandelen) en global data,
     # Om het systeem zo eenvoudig mogelijk te maken gaan we er altijd  van globale gedefinieerde uit TENZIJ we dit lokaal op de host gedefinieerd hebben

     # om te weten welke variabelen we moeten ophalen moeten we een lijstje van variabelen ophalen uit de variabelen lisrt uit de StateType

     # TODO: new type definen voor variabelen van state
     # Dit is specefiek aan de statetype
     kvbuilder  = KeyValListBuilder()
     kvbuilder.addKeyValPair("remoteuser",RemoteSettings.remoteuser)
     kvbuilder.addKeyValPair("username",credentials.username)
     kvbuilder.addKeyValPair("password",credentials.password)
     kvbuilder.addKeyValPair("dryrun","False")

     for key, value in selectedSettings.items():
      kvbuilder.addKeyValPair(key,value)






     handlerRequest.setKeyValList(kvbuilder.build())

     handlerRequest.setKeyValList(kvbuilder.build())
     return handlerRequest
