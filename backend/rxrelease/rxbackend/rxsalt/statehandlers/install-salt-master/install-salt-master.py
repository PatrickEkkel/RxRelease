from rxbackend.ssh.ssh import SSHClient
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
import logging,paramiko,sh,sys,json


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']
print(token_result["token"])
inputmapping = InputMapper().getInputFromCLI()
data = json.loads(inputmapping.getKeyvalList())
print(data["username"])

logger.info("Installing Salt master for " + data['os'] + " under useraccount " + data['username'])

#client = SSHClient(inputmapping.getIpAddress())
#client.loginWithKeys(data['remoteuser'])

try:
  client = SSHWrapper.with_keys(data['remoteuser'],inputmapping.getIpAddress(), data['sshport'])

  if data['os'] == "CentOS":
  # first remove salt, if it was already installed
   client.send_blocking_command("sudo yum install -y https://repo.saltstack.com/yum/redhat/salt-repo-2018.3-1.el7.noarch.rpm")
   client.send_blocking_command('sudo yum remove -y salt-master')
   client.send_blocking_command('sudo rm -rf /etc/salt')
   client.send_blocking_command('sudo yum install -y salt-master')
   client.send_blocking_command('sudo systemctl start salt-master')

   reststates_api = REST_states(auth_token)
   state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
   state =  state[0]
   statemanager = StateManager(auth_token)
   statemanager.setSimpleStateInstalled(state)
except paramiko.AuthenticationException:
 print("oops")
 raise
