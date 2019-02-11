import ntpath,os
from pepper import Pepper
from rxbackend.core.io.rxfilestore import RxFileStore
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.ssh.connectiondetails import ConnectionDetails
from rxbackend.configuration.globalsettings import NetworkSettings,LocalSettings,ApiUserSettings


class SaltApi:

    def __init__(self,ssh_connectiondetails,salt_connection_details):
        self.ssh_connectiondetails = ssh_connectiondetails
        self.salt_connection_details = salt_connection_details


    def _connect(self):
        api = Pepper('http://' + self.salt_connection_details.salt_master  + ':8080')
        api.login(self.salt_connection_details.username,self.salt_connection_details.password, 'pam')
        return api


    def apply_state(self,state):
        api = self._connect()
        pass


    def high_state(self,minion_id):
        pass


    def sync_formula(self,formula_name):
        remoteuser = self.ssh_connectiondetails.username
        localuser=LocalSettings.localuser
        # get the parent dir
        parent_dir = formula_name.split('/')[-2:][0]

        filestorelocation = '/home/' + localuser + '/.rxrelease/'
        rxfilestore = RxFileStore(filestorelocation)
        # eigenlijk willen we 2 directories aanmaken, eentje is niet genoeg
        rxfilestore.create_dir(parent_dir)
        rxfilestore.set_context(parent_dir)
        copied_file = rxfilestore.copy_file(formula_name)

        client = SSHWrapper.with_connection_details(self.ssh_connectiondetails)
        textfile = rxfilestore.open_text_file(ntpath.basename(copied_file))
        file_handle = rxfilestore.get_filestore_location_with_context() + textfile.getFilename()
        # TODO: gebruik laten maken van de localstore API
        client.send_blocking_command('mkdir -p ~/.localstore/' + parent_dir)
        client.send_file(file_handle, '~/.localstore/' + parent_dir + '/'   + ntpath.basename(formula_name))


    def ping(self,target):
        api = self._connect()
        return api.low([{'client': 'local', 'tgt': target, 'fun': 'test.ping'}])


    def cmd_run(self,target,cmd_string):
        api = self._connect()
        return api.low([{'client': 'local', 'tgt': target, 'fun': 'cmd.run', 'arg': cmd_string}])
