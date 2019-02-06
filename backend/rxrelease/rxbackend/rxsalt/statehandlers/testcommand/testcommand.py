#!/usr/bin/python3
import sys,json,sh,os
from pepper import Pepper
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.rxsalt.api.salt_api import SaltApi

inputmapping = InputMapper().getInputFromCLI()

token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']

formulas_dir = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '..','formulas'))
print(formulas_dir)



reststates_api = REST_states(auth_token)
state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
#update state to ready
state = state[0]
statemanager = StateManager(auth_token)
statemanager.setRepeatableStateDone(state)
print("state json object")
data = json.loads(inputmapping.getKeyvalList())

# TODO: saltpassword uit de database halen via het statetype
salt_command = data['salt-command']
use_salt_api = data['use-salt-api']
minion_id = data['salt-minion-id']
salt_function = data['salt-function']
salt_master = inputmapping.ipaddress
if use_salt_api == 'True':
    salt_username = 'salt'
    salt_password = 'test'
    salt_api = SaltApi(salt_master, salt_username, salt_password)
    salt_api.sync_formula(formulas_dir + "/docker_ce/init.sls")
    #api = Pepper('http://' + salt_master  + ':8080')
    #api.login(salt_username,salt_password,'pam')
    # cmd.run example
    if salt_function == 'SALTCOMMAND':
     #print(api.low([{'client': 'local','tgt': minion_id,'fun': 'cmd.run','arg': salt_command}]))
     print(salt_api.cmd_run(minion_id,salt_command))
    elif salt_function == 'SALTPING':
     #print(api.low([{'client': 'local', 'tgt': minion_id, 'fun': 'test.ping'}]))
     print(salt_api.ping(minion_id))
else:
 print("don't invoke the salt api, print this string to let you know we are in testing mode")
 print(salt_command)
