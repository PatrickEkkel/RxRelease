from handlerrequest import HandlerRequest


class RequestBuilder:
    pass

    def buildRequest(self,state):
     handlerRequest = HandlerRequest()
     handlerRequest.setIpAddress(state.host.ipaddress)
     handlerRequest.setHostId(state.host_id)
     handlerRequest.setStateTypeId(state.statetype_id)
     handlerRequest.setHandlerCommand(state.statetype.handler)
     return handlerRequest
