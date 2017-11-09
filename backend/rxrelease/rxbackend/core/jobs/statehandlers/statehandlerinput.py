import sys

class StateHandlerInput:

    def __init__(self,host_id,state_id,ipaddress,keyvallist):
        self.host_id = host_id
        self.state_id = state_id
        self.ipaddress = ipaddress
        self.keyvallist = keyvallist

    def getGetHostId(self):
        return self.host_id
    def getStateId(self):
        return self.state_id
    def getIpAddress(self):
        return self.ipaddress
    def getKeyvalList(self):
        return self.keyvallist
