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

token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']
inputmapping = InputMapper().getInputFromCLI()
data = json.loads(inputmapping.getKeyvalList())
current_working_dir = dir_path = os.path.dirname(os.path.realpath(__file__))


logger.info("Running saltmaster setup")
client = SSHWrapper.withKeys(data['remoteuser'],inputmapping.getIpAddress())


if data['os'] == "CentOS":
    logger.info('OS verified, running setup script')
    client.sendFile(current_working_dir + '/salt_master_config.txt','~/.localstore/salt_master_config.txt')
    client.sendBlockingCommand('sudo touch /etc/salt/master')
    client.sendBlockingCommand('sudo mkdir -p /srv/salt')
    #print(client.sendBlockingCommand('test -a ~/.localstore/backup_master_config.bak'))
    if client.sendBlockingCommand('test -a ~/.localstore/backup_master_config.bak') == 0:
     client.sendBlockingCommand('sudo cp ~/.localstore/backup_master_config.bak /etc/salt/master')
    else:
     client.sendBlockingCommand('sudo cp /etc/salt/master ~/.localstore/backup_master_config.bak')
    client.sendBlockingCommand('sudo su -c \' cat /tmp/salt_master_config.txt >> /etc/salt/master\'')
