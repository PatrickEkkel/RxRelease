from .statetypehandlerrequest import StateTypeHandlerRequest

class StateTypeHandlerFactory:
    def __init__(self):
        pass
    def createStateTypeHandlerRequest(self,payload):
        print(payload)
        payloadElements =  payload.split(',')
        host_id = payloadElements[0].split('=')[1]
        statetype_id = payloadElements[2].split('=')[1]
        ipaddress = payloadElements[1]
        handlerCommand = payloadElements[3]

        request = StateTypeHandlerRequest()

        request.setHostId(host_id)
        request.setStateTypeId(statetype_id)
        request.setIpAddress(ipaddress)
        request.setHandlerCommand(handlerCommand)

        return request
