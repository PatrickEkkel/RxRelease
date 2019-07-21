import sys, json, sh, os, logging
from pepper import Pepper
from rxbackend.configuration.globalsettings import LocalSettings, RemoteSettings, ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.restapi.REST_hosts import REST_hosts
from rxbackend.core.restapi.REST_settings import REST_settings
from rxbackend.rxsalt.api.salt_api import SaltApi
from rxbackend.rxsalt.api.salt_command import SaltCommandMapper
from rxbackend.rxsalt.api.salt_service import SaltService
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
data = json.loads(inputmapping.getKeyvalList())

token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']

formulas_dir = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '..', 'formulas'))

reststates_api = REST_states(auth_token)
resthosts_api = REST_hosts(auth_token)
restsettings_api = REST_settings(auth_token)

salt_mapping = SaltCommandMapper.create_from_dict(data)

host = resthosts_api.get_host_by_id(inputmapping.host_id)
hostname = host['hostname']
ssh_port = data['sshport']


salt_api_port = data['saltapiport']
salt_username = data['salt-username']
salt_password = data['salt-password']
salt_minion_id = host['hostname']
test = data['test']

host_username = 'root'
host_password = 'test'

salt_master = inputmapping.ipaddress
tmp_dir = '/tmp/saltmock/'
id_rsa = tmp_dir + 'id_rsa'

execution_state = 'NOT_EXECUTED'

# TODO: zmq berichten underscores laten ondersteunen, dit begint vervelend te worden
if salt_mapping.api_mode == 'SALTTESTDOCKER':
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

    sh.ssh_keygen("-t", "rsa", "-f", id_rsa, _in="\n")
    rx_localstore = RxLocalStore()
    connection_details = ConnectionDetails(host_username,host_password, salt_master, False, ssh_port)
    ssh_login = SSHWrapper.with_connection_details(connection_details)
    ssh_login.send_blocking_command('mkdir /root/.ssh')
    ssh_login.send_file(id_rsa_pub,'/root/.ssh/authorized_keys')


if salt_mapping.api_mode == 'SALTTESTVIRT' or salt_mapping.api_mode == 'SALTTESTDOCKER' or salt_mapping.api_mode == 'PRODUCTION':


    ssh_connection_details = ConnectionDetails.\
        new_connection_with_custom_key(host_username, host_password, salt_master, id_rsa, ssh_port)

    salt_connection_details = SaltConnectionDetails(salt_username, salt_password, salt_master, salt_api_port)
    salt_service = SaltService(ssh_connection_details, salt_connection_details, auth_token)

    salt_api = SaltApi(ssh_connection_details, salt_connection_details)

    if salt_mapping.salt_function == 'SALTCOMMAND':
        # TODO: deze directe call naar de salt-api eruit slopen
        salt_api.cmd_run(salt_mapping.salt_minion_id, salt_mapping.command)
    elif salt_mapping.salt_function == 'APPLYSTATE':
        salt_service.execute_formula(salt_mapping.formula, salt_minion_id, test)
    elif salt_mapping.salt_function == 'LISTALLACCEPTEDMINIONS':
        minions = salt_api.list_all_unaccepted_minions()
        print(minions)
    elif salt_mapping.salt_function == 'ACCEPTMINIONS':
        salt_service.accept_unaccepted_minions()
    elif salt_mapping.salt_function == 'ACCEPTMINION':

        # choose the current host if salt_mapping.minion_id is None
        minion_to_accept = None
        print('salt_minion_id: ' + salt_mapping.salt_minion_id)
        if salt_mapping.salt_minion_id is None:
            minion_to_accept = host
        else:
            minion_to_accept = resthosts_api.get_host_by_hostname(salt_mapping.salt_minion_id)[0]
        # after a fresh install, the system does not pickup the minion directly,
        # therefore we need a retry mechanism
        print(minion_to_accept)
        if not salt_service.accept_minion(minion_to_accept):
            execution_state = 'APPLIED_BUT_FAILED_RETRYABLE'
        else:
            execution_state = 'APPLIED'

    elif salt_mapping.salt_function == 'SYNCFORMULA':
        salt_api.sync_formula(salt_mapping.formula)

elif salt_mapping.api_mode == 'SALTTESTDRYRUN':
    print("don't invoke the salt api, print this string to let you know we are in testing mode")
    print(salt_mapping.command)

state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(), inputmapping.getStateId())
# update state to ready
state = state[0]
statemanager = StateManager(auth_token)
if statemanager.isRepeatableState(state):
    statemanager.setRepeatableStateDone(state)

elif statemanager.isComplexState(state):
    statemanager.setComplexStateStatus(state,execution_state)
