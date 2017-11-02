from .handlerrequest import HandlerRequest
from ..api.utils import Utils

class HandlerFactory:
    def __init__(self):
        pass
    def createRequest(self,payload):

        payloadElements =  payload.split(',')
        host_id = payloadElements[0].split('=')[1]
        statetype_id = payloadElements[2].split('=')[1]
        ipaddress = payloadElements[1]
        handlerCommand = payloadElements[3].split('=')[1]
        keyvallist = payloadElements[4].split('=')[1]
        # decode the keyvallist from the transport
        keyvalList = Utils.escapeJsonFromTransport(keyvallist)

        request = HandlerRequest()
        request.setHostId(host_id)
        request.setStateTypeId(statetype_id)
        request.setIpAddress(ipaddress)
        request.setHandlerCommand(handlerCommand)
        request.setKeyValList(keyvalList)
        return request
