class StateTypeHandlerRequest:

    def setHostId(self,host_id):
     self.host_id = host_id
    def getHostId(self):
        return self.host_id
    def setStateTypeId(self,statetype_id):
     self.statetype_id = statetype_id
    def getStateTypeId(self):
        return self.statetype_id
    def setIpAddress(self,ipaddress):
        self.ipaddress = ipaddress
    def setKeyValList(self,keyvalList):
     self.keyvalList = keyvalList
    def setHandlerType(self,handlerType):
     self.handlerType = handlerType
    def getHandlerType(self):
        return self.getHandlerType
    def setHandlerCommand(self,handlerCommand):
     self.handlerCommand = handlerCommand
    def getHandlerCommand(self):
        return self.handlerCommand
    def __str__(self):
        return '{ "host_id": "' + self.getHostId() + '", "statetype_id": "' + self.getStateTypeId() + '", "keyvalList": "\'{\\"username\\": \\"test\\",\\"password\\": \\"biertje\\",\\"dryrun\\": \\"true\\"}\'", "handlerType": "python","handlerCommand": "' + self.getHandlerCommand() + '"  }'
