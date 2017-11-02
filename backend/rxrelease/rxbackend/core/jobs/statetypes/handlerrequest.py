class HandlerRequest:

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
    def getIpAddress(self):
        return self.ipaddress
    def getKeyValList(self):
        return self.keyvalList
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
    def getAsPayload(self):
         payload =  "hostid=" + str(self.getHostId()) + "," + "ipaddress=" + str(self.getIpAddress()) + "," + "statetypeid=" + str(self.getStateTypeId()) + "," + "handlerCommand=" + self.getHandlerCommand() + "," + "keyvalList=" + self.getKeyValList()
         return payload
    def __str__(self):
        return '{ "host_id": "' + str(self.getHostId()) + '", "statetype_id": "' + str(self.getStateTypeId()) + '", "keyvalList": "' + self.getKeyValList() + '",  "handlerType": "python","handlerCommand": "' + self.getHandlerCommand() + '"  }'
        #return '{ "host_id": "' + self.getHostId() + '", "statetype_id": "' + self.getStateTypeId() + '", "keyvalList": "\'{\\"username\\": \\"test\\",\\"password\\": \\"biertje\\",\\"dryrun\\": \\"true\\"}\'", "handlerType": "python","handlerCommand": "' + self.getHandlerCommand() + '"  }'
