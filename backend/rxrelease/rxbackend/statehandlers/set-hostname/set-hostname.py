import sys, json, sh, os, logging
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.restapi.REST_hosts import REST_hosts
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.configuration.globalsettings import NetworkSettings, LocalSettings, ApiUserSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

token_result = REST_authentication().postCredentials(ApiUserSettings.username,
                                                     ApiUserSettings.password)


auth_token = token_result['token']


inputmapping = InputMapper().getInputFromCLI()
data = json.loads(inputmapping.getKeyvalList())
resthosts_api = REST_hosts(auth_token)
host = resthosts_api.get_host_by_id(inputmapping.host_id)
hostname = host['hostname']
client = SSHWrapper.with_password(inputmapping.getIpAddress(), data["username"], data["password"], data['sshport'])
client.send_blocking_command("hostname " + hostname)
client.send_blocking_command("echo '" + hostname + "' > /etc/hostname")

reststates_api = REST_states(auth_token)
state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),
                                                        inputmapping.getStateId())
state = state[0]
statemanager = StateManager(auth_token)
statemanager.setSimpleStateInstalled(state)
