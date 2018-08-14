#!/usr/bin/python3
from rxbackend.ssh.ssh import SSHClient
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
import logging,paramiko,sh,sys,json,os
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

logger.info("Installing Salt api for " + data['os'] + " under useraccount " + data['username'])
currenthost = data['saltmaster']
client = SSHWrapper.withKeys(data['remoteuser'],inputmapping.getIpAddress())
current_working_dir = dir_path = os.path.dirname(os.path.realpath(__file__))

logger.info('Current working dir: ' + current_working_dir)
try:
 #client.loginWithKeys(data['remoteuser'])
 logging_dir = '/var/log/rxrelease'
 salt_pass = 'testpass'
 if data['os'] == "CentOS":
  #client.sendCommandWithOutput('ls -al')
  # first remove salt, if it was already installed
  client.sendBlockingCommand('sudo userdel salt')
  client.sendBlockingCommand('sudo useradd salt -m')
  client.sendBlockingCommand('sudo echo ' + salt_pass +  ' | passwd --stdin salt')
  client.sendBlockingCommand('sudo yum remove  -y salt-api')
  client.sendBlockingCommand('sudo yum install -y salt-api')
  client.sendFile(current_working_dir + '/salt_api_config.txt','/tmp/test')
  client.sendBlockingCommand('sudo systemctl start salt-api')
  # implementeer de volgende stappen in dit install-salt-api script om ervoor te zorgen dat de salt-api volledig geinstalleerd wordt
  # http://bencane.com/2014/07/17/integrating-saltstack-with-other-services-via-salt-api/
  # https://github.com/saltstack/pepper
  # https://docs.saltstack.com/en/latest/ref/netapi/all/salt.netapi.rest_cherrypy.html#login

  reststates_api = REST_states(auth_token)
  state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
  state =  state[0]
  state['installed'] = True
  reststates_api.putState(state)
except paramiko.AuthenticationException:
 print("oops")
 raise
