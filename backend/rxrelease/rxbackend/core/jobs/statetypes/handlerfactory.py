from .handlerrequest import HandlerRequest
from ..api.utils import Utils
import logging,sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class HandlerFactory:
    def __init__(self):
        pass
    def createRequest(self,payload):
        payloadElements =  payload.split(',')
        if len(payloadElements) < 5:
         logger.debug("Amount of elements found: " + str(len(payloadElements)) + " expected 5, probable causes could be illigal chars in handlerscriptname (_,;)")     
        #
        print("string consists out of: " + str(payload))
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
