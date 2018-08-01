#!/usr/bin/python3
from rxbackend.ssh.ssh import SSHClient
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
import logging,paramiko,sh,sys,json
# we gaan er even vanuit dat passwordless_sshlogin vanaf deze locatie nu geregeld is

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

# before we start lets do some authentication

token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']
inputmapping = InputMapper().getInputFromCLI()
data = json.loads(inputmapping.getKeyvalList())

logger.info("Installing Salt minion for " + data['os'] + " under useraccount " + data['username'])
currenthost = data['saltmaster']
client = SSHClient(inputmapping.getIpAddress())

try:
 client.loginWithKeys(data['remoteuser'])
 logging_dir = '/var/log/rxrelease'
 if data['os'] == "CentOS":
  #client.sendCommandWithOutput('ls -al')
  client.sendBlockingCommand('sudo mkdir -p ' + logging_dir)
  client.sendBlockingCommand('sudo date >> ' + logging_dir + '/salt_minion_install')
  # first remove salt, if it was already installed
  client.sendBlockingCommand('sudo yum remove -y salt-minion >>' + logging_dir)
  client.sendBlockingCommand('sudo rm -rf /etc/salt')
  client.sendBlockingCommand('sudo yum install -y salt-minion')
  client.sendCommand('sudo sed -i "s|#master: salt|master:\ "' + currenthost + '"|g" /etc/salt/minion')
  client.sendBlockingCommand('sudo systemctl start salt-minion')

  reststates_api = REST_states(auth_token)
  state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
  state =  state[0]
  state['installed'] = True
  reststates_api.putState(state)
except paramiko.AuthenticationException:
 print("oops")
 raise
