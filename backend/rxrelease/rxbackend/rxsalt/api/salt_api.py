import ntpath,os
from pepper import Pepper
from rxbackend.core.rxfilestore import RxFileStore
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.configuration.globalsettings import NetworkSettings,LocalSettings,ApiUserSettings


class SaltApi:

    def __init__(self,salt_master,salt_username,salt_password):
     self.salt_master = salt_master
     self.salt_username = salt_username
     self.salt_password = salt_password
    def _connect(self):
        api = Pepper('http://' + self.salt_master  + ':8080')
        api.login(self.salt_username,self.salt_password,'pam')
        return api

    def apply_state(self,state):
     api = self._connect()
     pass
    def high_state(self,minion_id):
     pass

    def sync_formula(self,formula_name):
     remoteuser = 'rxrelease'
     localuser=LocalSettings.localuser
     # get the parent dir
     parent_dir = formula_name.split('/')[-2:][0]

     filestorelocation = '/home/' + localuser + '/.rxrelease/'
     rxfilestore = RxFileStore(filestorelocation)
     # eigenlijk willen we 2 directories aanmaken, eentje is niet genoeg
     rxfilestore.createDir(parent_dir)
     rxfilestore.setContext(parent_dir)
     copied_file = rxfilestore.copyFile(formula_name)
     client = SSHWrapper.withKeys(remoteuser, self.salt_master)
     textfile = rxfilestore.openTextFile(ntpath.basename(copied_file))
     file_handle = rxfilestore.getFileStoreLocationWithContext() + textfile.getFilename()
     client.sendBlockingCommand('mkdir ~/.localstore/' + parent_dir)
     client.sendFile(file_handle,'~/.localstore/' + parent_dir + '/'   + ntpath.basename(formula_name))



    def ping(self,target):
     api = self._connect()
     return api.low([{'client': 'local', 'tgt': target, 'fun': 'test.ping'}])

    def cmd_run(self,target,cmd_string):
     api = self._connect()
     return api.low([{'client': 'local','tgt': target,'fun': 'cmd.run','arg': cmd_string}])
