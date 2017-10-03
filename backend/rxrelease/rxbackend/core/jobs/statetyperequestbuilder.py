from statetypehandlerrequest import StateTypeHandlerRequest


class StateTypeRequestBuilder:
    pass

    def buildRequest(self,state):
     handlerRequest = StateTypeHandlerRequest()
     handlerRequest.setIpAddress(state.host.ipaddress)
     handlerRequest.setHostId(state.host_id)
     handlerRequest.setStateTypeId(state.statetype_id)
     handlerRequest.setHandlerCommand(state.statetype.handler)
     return handlerRequest
