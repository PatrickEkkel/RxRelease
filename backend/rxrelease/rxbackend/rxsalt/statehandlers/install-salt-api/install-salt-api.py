#!/usr/bin/python3
from rxbackend.ssh.ssh import SSHClient
from rxbackend.ssh.sshwrapper import SSHWrapper
from rxbackend.ssh.connectiondetails import ConnectionDetails
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.templateparser import TemplateParser
from rxbackend.configuration.globalsettings import NetworkSettings, LocalSettings, ApiUserSettings
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
import logging, paramiko, sh, sys, json, os

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

logger.info("Installing Salt api for " + data['os'] + " under useraccount " + data['username'])
currenthost = data['saltmaster']
client = SSHWrapper.with_keys(data['remoteuser'], inputmapping.getIpAddress(), data['sshport'])
current_working_dir = dir_path = os.path.dirname(os.path.realpath(__file__))

logger.info('Current working dir: ' + current_working_dir)
try:
    # client.loginWithKeys(data['remoteuser'])
    logging_dir = '/var/log/rxrelease'
    salt_username = data['salt-username']
    salt_password = data['salt-password']
    if data['os'] == "CentOS":
        salt_api_config_txt = current_working_dir + '/salt_api_config.txt'
        template_parser = TemplateParser(salt_api_config_txt)
        template_parser.replace_tokens('$SALT_USERNAME', salt_username)
        salt_api_config_txt_handle = template_parser.template_file()
        # client.sendCommandWithOutput('ls -al')
        # first remove salt, if it was already installed
        client.send_blocking_command('sudo userdel ' + salt_username)
        client.send_blocking_command('sudo useradd ' + salt_username + ' -m')
        client.send_blocking_command('sudo su -c \'echo ' + salt_password +
                                   ' | passwd --stdin ' + salt_username + '\'')
        client.send_blocking_command('sudo yum remove  -y salt-api')
        client.send_blocking_command('sudo yum install -y salt-api')
        client.send_file(salt_api_config_txt_handle, '~/.localstore/salt_api_config.txt')
        client.send_blocking_command('sudo cp /home/rxrelease/'
                                   '.localstore/salt_api_config.txt /etc/salt/master')
    client.send_blocking_command('sudo systemctl start salt-api')
    client.send_blocking_command('sudo firewall-cmd --permanent --add-port=8080/tcp')
    client.send_blocking_command('sudo firewall-cmd --reload')
    client.send_blocking_command('sudo systemctl restart salt-master')
    # implementeer de volgende stappen in dit install-salt-api script om ervoor te zorgen dat de
    # salt-api volledig geinstalleerd wordt
    # http://bencane.com/2014/07/17/integrating-saltstack-with-other-services-via-salt-api/
    # https://github.com/saltstack/pepper
    # https://docs.saltstack.com/en/latest/ref/netapi/all/salt.netapi.rest_cherrypy.html#login

    reststates_api = REST_states(auth_token)
    state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),
                                                    inputmapping.getStateId())
    state = state[0]
    statemanager = StateManager(auth_token)
    statemanager.setSimpleStateInstalled(state)

    #state['installed'] = True
    #reststates_api.putState(state)
except paramiko.AuthenticationException:
    print("oops")
    raise
