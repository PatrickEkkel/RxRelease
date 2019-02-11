import sys,json,sh,os,logging
from pepper import Pepper
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.restapi.REST_hosts import REST_hosts
from rxbackend.rxsalt.api.salt_api import SaltApi
from rxbackend.rxsalt.api.salt_connection_details import SaltConnectionDetails
from rxbackend.core.io.rxlocalstore import RxLocalStore
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.ssh.connectiondetails import ConnectionDetails


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

inputmapping = InputMapper().getInputFromCLI()

token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']

formulas_dir = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '..','formulas'))
#print(formulas_dir)

reststates_api = REST_states(auth_token)
resthosts_api = REST_hosts(auth_token)


state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(), inputmapping.getStateId())
#update state to ready
state = state[0]
statemanager = StateManager(auth_token)
statemanager.setRepeatableStateDone(state)
data = json.loads(inputmapping.getKeyvalList())

# TODO: saltpassword uit de database halen via het statetype
salt_command = data['salt-command']
api_mode = data['api-mode']
minion_id = data['salt-minion-id']
salt_function = data['salt-function']

host = resthosts_api.get_host_by_id(inputmapping.host_id)

host_username = 'root'
host_password = 'test'
salt_master = inputmapping.ipaddress
tmp_dir = '/tmp/saltmock/'
id_rsa = tmp_dir + 'id_rsa'

# TODO: zmq berichten underscores laten ondersteunen, dit begint vervelend te worden
if api_mode == 'SALTTESTDOCKER':
    logger.debug("Creating intermediate SSH key for accessing the mock salt-master")

    if not os.path.exists(tmp_dir):
        try:
            os.makedirs(tmp_dir, 0o700)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise


    id_rsa_pub = tmp_dir + 'id_rsa.pub'
    if os.path.exists(id_rsa):
        sh.rm(id_rsa)

    sh.ssh_keygen("-t","rsa","-f",id_rsa,_in="\n")
    rx_localstore = RxLocalStore()
    connection_details = ConnectionDetails(host_username,host_password,salt_master,False,2222)
    ssh_login = SSHWrapper.with_connection_details(connection_details)
    ssh_login.send_blocking_command('mkdir /root/.ssh')
    ssh_login.send_file(id_rsa_pub,'/root/.ssh/authorized_keys')


if api_mode == 'SALTTESTVIRT' or api_mode == 'SALTTESTDOCKER':
    salt_username = 'salt'
    salt_password = 'test'
    ssh_connection_details =  ConnectionDetails.new_connection_with_custom_key(host_username,host_password,salt_master,id_rsa,2222)
    salt_connection_details = SaltConnectionDetails(salt_username,salt_password,salt_master)
    salt_api = SaltApi(ssh_connection_details,salt_connection_details)
    salt_api.sync_formula(formulas_dir + "/docker_ce/init.sls")

elif api_mode == 'SALTTESTDRYRUN':
    print("don't invoke the salt api, print this string to let you know we are in testing mode")
    print(salt_command)
