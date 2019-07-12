

class SaltConnectionDetails:

    def __init__(self,username,password,salt_master,salt_port):
        self.username = username
        self.password = password
        self.salt_master = salt_master
        self.port = salt_port
