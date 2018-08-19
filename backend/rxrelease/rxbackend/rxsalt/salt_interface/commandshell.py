from pepper import Pepper

class SaltShell:

    def __init__(self,salt_master_server_address,salt_username,salt_password):
        salt_url = 'http://' + salt_master_server_address + ':8080'
        self.api = Pepper(salt_url)
        self.api.login(salt_username,salt_password,'pam')
        pass
    def unaccepted_clients(self):
        pass
    def apply_state(self,target_host,salt_state):
        if self.api is not None:
         self.api.low([{'client': 'local','tgt': target_host,'fun': 'state.apply','arg': salt_state}])
        pass
    def cmd_run(self,target_host,command):
        if self.api is not None:
         self.api.low([{'client': 'local','tgt': target_host,'fun': 'cmd.run','arg': command}])
