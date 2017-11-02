from handlerrequest import HandlerRequest
from ...dao.hostdao import HostDao
from ...dao.settingsdao import SettingsDao
from ..api.keyvallistbuilder import KeyValListBuilder

class RequestBuilder:

    def buildRequest(self,state):
     hostDao = HostDao()
     settingsDao = SettingsDao()

     host = hostDao.getHostById(state.host_id)
     credentials = settingsDao.getCredentialSettingsById(host.id)


     handlerRequest = HandlerRequest()
     handlerRequest.setIpAddress(state.host.ipaddress)
     handlerRequest.setHostId(state.host_id)
     handlerRequest.setStateTypeId(state.statetype_id)
     handlerRequest.setHandlerCommand(state.statetype.handler)


     kvbuilder  = KeyValListBuilder()

     kvbuilder.addKeyValPair("username",credentials.username)
     kvbuilder.addKeyValPair("password",credentials.password)
     kvbuilder.addKeyValPair("dryrun","True")
     handlerRequest.setKeyValList(kvbuilder.build())

     handlerRequest.setKeyValList(kvbuilder.build())
     return handlerRequest
