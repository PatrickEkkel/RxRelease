import sys
from .defaultvalueresolver import ValueResolver

class StateHandlerInput:

    def __init__(self, host_id, state_id, ipaddress, keyvallist, auth_token):
        self.host_id = host_id
        self.state_id = state_id
        self.ipaddress = ipaddress
        self.keyvallist = keyvallist
        self.auth_token = auth_token
        self.value_resolver = ValueResolver(self.auth_token, self)

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
            kv_array = kv.split(':')
            key = ""
            value = ""

            if len(kv_array) < 2:
                print(kv_array[0] + " contains empty value, skipping.. ")
            else:
                key = kv_array[0]
                # this is point where we want to interface with the valueresolver
                value = kv_array[1]
                value = self.value_resolver.resolve_value(value)


            result += "\"" + key + "\"" + ":" + "\"" + value + "\","

        result = result[:-1]
        result += "}"

        print(result)
        return result
