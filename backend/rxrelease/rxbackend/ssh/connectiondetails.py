
class ConnectionDetails:

    def __init__(self, username,password, ipaddress, use_default_keys=False, port=22, key_location=None):
        self.username = username
        self.password = password
        self.ipaddress = ipaddress
        self.use_default_keys = use_default_keys
        self.port = port
        self.key_location = key_location


    @classmethod
    def new_connection_with_custom_key(self,username, password, ipaddress, key_location,ssh_port=22):
        return ConnectionDetails(username, password, ipaddress, False, ssh_port, key_location)
