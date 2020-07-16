#!/usr/bin/python3
import logging
import sh,sys,json

from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.jobs.api.utils import Utils
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.ssh.ssh import SSHClient
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.ssh.sshwrapper import SSHWrapper


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

localuser=LocalSettings.localuser
remoteuser=RemoteSettings.remoteuser
# retrieve the authentication token
token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']
inputmapping = InputMapper().getInputFromCLI(auth_token)


data = json.loads(inputmapping.getKeyvalList())



client = SSHWrapper.with_keys(data['remoteuser'],inputmapping.getIpAddress(), data['sshport'])

if data['os'] == "CentOS":
 # first remove salt, if it was already installed
 client.send_blocking_command('sudo yum install -y wget')
 client.send_blocking_command('sudo yum install -y unzip')
 client.send_blocking_command('wget http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm')
 client.send_blocking_command('sudo rpm -ivh epel-release-latest-7.noarch.rpm')

 reststates_api = REST_states(auth_token)
 state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
 state = state[0]
 statemanager = StateManager(auth_token)
 statemanager.setSimpleStateInstalled(state)
