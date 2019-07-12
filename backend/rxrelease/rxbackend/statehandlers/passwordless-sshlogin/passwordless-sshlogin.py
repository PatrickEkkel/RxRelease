#!/usr/bin/python3
import logging
import sh
import json
import os.path, sys
import paramiko
from pathlib import Path
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.jobs.api.utils import Utils
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.ssh.ssh import SSHClient
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.ssh.connectiondetails import ConnectionDetails
from rxbackend.core.io.rxfilestore import RxFileStore
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

localuser = LocalSettings.localuser
remoteuser = RemoteSettings.remoteuser

inputmapping = InputMapper().getInputFromCLI()

# retrieve the authentication token
token_result = REST_authentication().postCredentials(ApiUserSettings.username, ApiUserSettings.password)
auth_token = token_result['token']
data = json.loads(inputmapping.getKeyvalList())
dryrun = data["dryrun"]
filestore = RxFileStore('/home/' + localuser + '/.rxrelease')

if Utils.str2bool(dryrun):
    logger.info("running script in dryrun with the following parameters")
    logger.info(inputmapping.getKeyvalList())
    reststates_api = REST_states(auth_token)
    state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(), inputmapping.getStateId())
    state = state[0]
    state['installed'] = True
    reststates_api.putState(state)
    sys.exit()

logger.info("connecting with : " + inputmapping.getIpAddress())
# TODO: code toevoegen die connectieproblemen afvangt

client = SSHWrapper.with_password(inputmapping.getIpAddress(), data["username"], data["password"], data['sshport'])

# user creation on remote machine
if client.send_command('id -u ' + remoteuser) == 1:
    # user does not exist, lets make it
    logger.info("user " + remoteuser + " does not exist on " + inputmapping.getIpAddress())
    client.send_command('adduser ' + remoteuser)

    # after user creation we want to be able to transfer the public key to the remote server.
    # But first we need to generate a private/public key pair on this server

# Run ssh-keygen on the local machine
rxfilestore = '/home/' + localuser + '/.rxrelease'
installed_id_rsa = '/home/' + localuser + '/.ssh/id_rsa'
installed_id_rsa_pub = '/home/' + localuser + '/.ssh/id_rsa.pub'
id_rsa = rxfilestore + '/id_rsa'
id_rsa_pub = rxfilestore + '/id_rsa.pub'
localstore_path = '/home/' + remoteuser + '/.localstore/'

# if there is no private key in the rxfilestore dir, then create a new one
if not Path(id_rsa).exists():
    sh.ssh_keygen("-t", "rsa", "-f", id_rsa, _in="\n")

# install public and private keys on current user
local_ssh_dir = '/home/' + localuser + '/.ssh'
if not Path(local_ssh_dir).exists():
    os.makedirs('/home/' + localuser + '/.ssh')

if not Path(installed_id_rsa).exists():
    sh.cp(id_rsa,'/home/' + localuser + '/.ssh/')

if not Path(installed_id_rsa_pub).exists():
    sh.cp(id_rsa_pub,'/home/' + localuser + '/.ssh/')
# create the localstore directory
if client.send_command('mkdir -p ' + localstore_path) != 0:
    print('localstore creation failed, aborting state')
    exit(0)

if client.send_command('chown ' + remoteuser + ':' + remoteuser + ' ' + localstore_path) != 0:
    # we need to transfer the public key to the host
    print('chown on localstore failed, aborting state')
    exit(0)

if client.send_command('mkdir -p /home/' + remoteuser + '/.ssh') != 0:
    print('SSH dir creation failed aborting state')
    exit(0)
    # TODO: misschien moeten we dit nog wat vriendelijker maken..
    #  nu pleurt hij er gewoon een nieuw bestand neer,
    #  niet zo cool als er al keys geconfigureerd waren

if client.send_file(id_rsa_pub, '/home/' + remoteuser + '/.ssh/authorized_keys') != 0:
    print('file scp for authorized keys failed, aborting state')
    exit(0)

if client.send_command("echo '" + remoteuser + " ALL=(ALL) NOPASSWD:ALL' | sudo EDITOR='tee -a' visudo") != 0:
    print('useradd to sudoers file failed, aborting state')
    exit(0)

# on my ubuntu i need to call ssh-add to get the authentication working..
# if this file exists, we are on ubuntu, so we need to run a
if os.path.isfile('/etc/osrelease'):
    sh.ssh_add()

reststates_api = REST_states(auth_token)
state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(), inputmapping.getStateId())
state = state[0]
statemanager = StateManager(auth_token)
statemanager.setSimpleStateInstalled(state)
