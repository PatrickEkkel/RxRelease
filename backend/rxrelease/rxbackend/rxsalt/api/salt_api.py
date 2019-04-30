import ntpath, os, logging, sys
import zipfile
from pepper import Pepper
from rxbackend.core.io.rxfilestore import RxFileStore
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.ssh.connectiondetails import ConnectionDetails
from rxbackend.rxsalt.api.salt_command import SaltDataRoot
from rxbackend.configuration.globalsettings import NetworkSettings, LocalSettings, ApiUserSettings
from rxbackend.core.io.rxlocalstore import RxLocalStore
from rxbackend.core.io.rxlocalcache import RxLocalCache
from rxbackend.rxsalt.configuration.saltsettings import SaltSettings

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
        api.login(self.salt_connection_details.username, self.salt_connection_details.password,
                  'pam')
        return api

    def apply_state(self, state, target):
        api = self._connect()
        result = api.low([{'client': 'local', 'tgt': target, 'fun': 'state.apply', 'arg': state}])
        logger.debug(result)
        return result

    def high_state(self, minion_id):
        pass

    def accept_minion(self, minion_id):
        api = self._connect()
        result = api.low([{'client': 'wheel', 'fun': 'key.accept', 'match': minion_id}])
        logger.debug(result)
        return result

    def list_all_unaccepted_minions(self):
        api = self._connect()
        result = api.low([{'client': 'wheel', 'fun': 'key.list_all'}])
        return SaltDataRoot(result).get_data(0).get_minions_pre()

    def sync_formula(self, formula_name):
        salt_home_dir = '/srv/salt/'
        formula_dir = salt_home_dir + formula_name

        localstore = RxLocalStore.get_localstore()
        localstore.set_context(localstore.get_context()
                               + SaltSettings.FORMULAS_DIR
                               + '/'
                               + formula_name)

        client = SSHWrapper.with_connection_details(self.ssh_connectiondetails)
        client.send_blocking_command('mkdir -p ' + salt_home_dir)
        client.send_blocking_command('mkdir -p ' + formula_dir)

        zf = RxLocalCache.create_temp_archive(formula_name)
        for root, dirs, files in os.walk(localstore.get_filestore_location_with_context()):
            for file in files:
                zip_root = os.path.relpath(os.path.join(root, file),
                                           localstore.get_filestore_location_with_context())
                zf.write(os.path.join(root, file), zip_root)

        zf.close()
        client.send_file(zf.filename, formula_dir)
        client.send_blocking_command(
            'cd ' + formula_dir + ' && unzip -o ' + ntpath.basename(zf.filename))
        client.send_blocking_command('cd ' + formula_dir + '&& rm ' + ntpath.basename(zf.filename))

    def ping(self, target):
        api = self._connect()
        return api.low([{'client': 'local', 'tgt': target, 'fun': 'test.ping'}])

    def cmd_run(self, target, cmd_string):
        api = self._connect()
        return api.low([{'client': 'local', 'tgt': target, 'fun': 'cmd.run', 'arg': cmd_string}])
