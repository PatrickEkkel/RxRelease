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

        result = "{"
        kv_list = self.keyvallist.split(',')

        for kv in kv_list:
         key = kv.split(':')[0]
         value = kv.split(':')[1]
         result += "\"" + key + "\"" + ":" + "\"" + value + "\","

        result = result[:-1]
        result += "}"

        print(result)
        return result
