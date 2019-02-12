from rxbackend.rxsalt.api.salt_api import SaltApi

class SaltService:

    def __init__(self,ssh_connection,salt_connection):

        self.salt_api = SaltApi(ssh_connection, salt_connection)
    def accept_unaccepted_minions(self):
        minions = self.salt_api.list_all_unaccepted_minions()
        for minion in minions:
            self.salt_api.accept_minion(minion)
