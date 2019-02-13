import ntpath,os,logging,sys
from pepper import Pepper
from rxbackend.core.io.rxfilestore import RxFileStore
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.ssh.connectiondetails import ConnectionDetails
from rxbackend.rxsalt.api.salt_command import SaltDataRoot
from rxbackend.configuration.globalsettings import NetworkSettings,LocalSettings,ApiUserSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SaltApi:

    def __init__(self, ssh_connectiondetails, salt_connection_details):
        self.ssh_connectiondetails = ssh_connectiondetails
        self.salt_connection_details = salt_connection_details

    def _connect(self):
        api = Pepper(('http://'
         + self.salt_connection_details.salt_master
         + ':'
         + str(self.salt_connection_details.port)))
        api.login(self.salt_connection_details.username, self.salt_connection_details.password, 'pam')
        return api

    def apply_state(self, state):
        api = self._connect()
        result = api.low([{'client': 'local', 'tgt': '*', 'fun': 'state.apply','arg': state}])
        logger.debug(result)
        return result
    def high_state(self, minion_id):
        pass


    def accept_minion(self,minion_id):
         api = self._connect()
         result = api.low([{'client': 'wheel', 'tgt': '*', 'fun': 'key.accept','match': minion_id}])
         logger.debug(result)
         return result
    def list_all_unaccepted_minions(self):
        api = self._connect()
        result = api.low([{'client': 'wheel', 'fun': 'key.list_all'}])
        return SaltDataRoot(result).get_data(0).get_minions_pre()
        # return result['return'][0]['data']['return']['minions_pre']

    def sync_formula(self, formula_name):
        remoteuser = self.ssh_connectiondetails.username
        localuser = LocalSettings.localuser
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
        localstore_formula_dir = '~/.localstore/' + parent_dir
        localstore_formula_init_file = localstore_formula_dir + '/' + ntpath.basename(formula_name)

        salt_home_dir = '/srv/salt/'
        formula_home_dir = salt_home_dir  + parent_dir + '/'
        client.send_blocking_command('mkdir -p ' + localstore_formula_dir)

        client.send_file(file_handle, localstore_formula_init_file)
        client.send_blocking_command('mkdir -p ' + formula_home_dir )
        client.send_blocking_command('cp ' + localstore_formula_init_file + ' ' + formula_home_dir  )

    def ping(self, target):
        api = self._connect()
        return api.low([{'client': 'local', 'tgt': target, 'fun': 'test.ping'}])

    def cmd_run(self, target, cmd_string):
        api = self._connect()
        return api.low([{'client': 'local', 'tgt': target, 'fun': 'cmd.run', 'arg': cmd_string}])
