from handlerrequest import HandlerRequest
from ...dao.hostdao import HostDao
from ...dao.settingsdao import SettingsDao
from ..api.keyvallistbuilder import KeyValListBuilder

class RequestBuilder:

    def buildRequest(self,state):
     hostDao = HostDao()
     settingsDao = SettingsDao()

     host = hostDao.getHostById(state.host_id)
     credentials = settingsDao.getCredentialSettingsById(host.connectioncredentials_id)

     # Dit stukje is generiek
     handlerRequest = HandlerRequest()
     handlerRequest.setIpAddress(state.host.ipaddress)
     handlerRequest.setHostId(state.host_id)
     handlerRequest.setStateTypeId(state.statetype_id)
     handlerRequest.setHandlerCommand(state.statetype.handler)

     # keyvalue pairs moeten dus opgehaald worden aan de hand van de statetype,
     # maar omdat we zitten met een configuratie per host moeten we de werkelijke settings uit de host halen

     # We maken hierbij een onderscheid tussen host data (specefiek voor de host die we afhandelen) en glob qal data,
     # Om het systeem zo eenvoudig mogelijk te maken gaan we er altijd  van globale gedefinieerde uit TENZIJ we dit lokaal op de host gedefinieerd hebben

     # om te weten welke variabelen we moeten ophalen moeten we een lijstje van variabelen ophalen uit de variabelen lisrt uit de StateType

     # TODO: new type definen voor variabelen van state


     # Dit is specefiek aan de statetype
     kvbuilder  = KeyValListBuilder()

     kvbuilder.addKeyValPair("username",credentials.username)
     kvbuilder.addKeyValPair("password",credentials.password)
     kvbuilder.addKeyValPair("dryrun","False")
     handlerRequest.setKeyValList(kvbuilder.build())

     handlerRequest.setKeyValList(kvbuilder.build())
     return handlerRequest
