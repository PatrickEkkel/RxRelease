
class ConnectionDetails:

    def __init__(self,username,password,ipaddress,use_keys=False,port=22):
        self.username = username
        self.password = password
        self.ipaddress = ipaddress
        self.use_keys = use_keys
        self.port = port
