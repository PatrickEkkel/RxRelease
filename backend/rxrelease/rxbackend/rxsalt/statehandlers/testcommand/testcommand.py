#!/usr/bin/python3
import sys
import json
import sh
from pepper import Pepper
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.restapi.REST_authentication import REST_authentication


inputmapping = InputMapper().getInputFromCLI()


token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
auth_token = token_result['token']


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
    api = Pepper('http://' + salt_master  + ':8080')
    api.login('salt','saltmaster','pam')
    # cmd.run example
    if salt_function == 'SALTCOMMAND':
     print(api.low([{'client': 'local','tgt': minion_id,'fun': 'cmd.run','arg': salt_command}]))
    elif salt_function == 'SALTPING':
     print(api.low([{'client': 'local', 'tgt': minion_id, 'fun': 'test.ping'}]))
else:
 print("don't invoke the salt api, print this string to let you know we are in testing mode")
 print(salt_command)
