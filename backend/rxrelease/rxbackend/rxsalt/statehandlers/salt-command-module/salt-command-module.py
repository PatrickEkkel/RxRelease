from rxbackend.ssh.ssh import SSHClient
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.rxsalt.salt_interface.commandshell import SaltShell
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
inputmapping = InputMapper().getInputFromCLI()
data = json.loads(inputmapping.getKeyvalList())

logger.info("Executing salt-master command:  " + data['command'])

#saltShell = SaltShell()
