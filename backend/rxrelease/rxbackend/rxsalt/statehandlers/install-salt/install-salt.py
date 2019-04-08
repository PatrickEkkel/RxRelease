#!/usr/bin/python3
from rxbackend.ssh.ssh import SSHClient
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
import logging, paramiko, sh, sys, json

# we gaan er even vanuit dat passwordless_sshlogin vanaf deze locatie nu geregeld is

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

# before we start lets do some authentication

token_result = REST_authentication().postCredentials(ApiUserSettings.username,
                                                     ApiUserSettings.password)
auth_token = token_result['token']
inputmapping = InputMapper().getInputFromCLI()
data = json.loads(inputmapping.getKeyvalList())

logger.info("Installing Salt minion for " + data['os'] + " under useraccount " + data['username'])
currenthost = data['saltmaster']
client = SSHWrapper.with_keys(data['remoteuser'], inputmapping.getIpAddress())

try:
    logging_dir = '/var/log/rxrelease'
    if data['os'] == "CentOS":
        # first remove salt, if it was already installed
        client.send_blocking_command('sudo yum remove -y salt-minion')
        client.send_blocking_command('sudo rm -rf /etc/salt')
        client.send_blocking_command('sudo yum install -y salt-minion')
        client.send_command(
            'sudo sed -i \'s|#master: salt|master:\ \'' + currenthost + '\'|g\' /etc/salt/minion')
        client.send_blocking_command('sudo systemctl start salt-minion')

        reststates_api = REST_states(auth_token)
        state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),
                                                        inputmapping.getStateId())
        state = state[0]
        statemanager = StateManager(auth_token)
        statemanager.setSimpleStateInstalled(state)
except paramiko.AuthenticationException:
    print("oops")
    raise
