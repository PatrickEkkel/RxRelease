from rxbackend.ssh.ssh import SSHClient
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
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
  client = SSHWrapper.withKeys(data['remoteuser'],inputmapping.getIpAddress())

  if data['os'] == "CentOS":
  # first remove salt, if it was already installed
   client.sendBlockingCommand('sudo yum remove -y salt-master')
   client.sendBlockingCommand('sudo rm -rf /etc/salt')
   client.sendBlockingCommand('sudo yum install -y salt-master')
   client.sendBlockingCommand('sudo systemctl start salt-master')

   reststates_api = REST_states(auth_token)
   state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
   state =  state[0]
   state['installed'] = True
  reststates_api.putState(state)
except paramiko.AuthenticationException:
 print("oops")
 raise
