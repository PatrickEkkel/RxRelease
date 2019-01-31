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
print(state)
state = state[0]



statemanager = StateManager(auth_token)
statemanager.setRepeatableStateDone(state)
print("state json object")
data = json.loads(inputmapping.getKeyvalList())

salt_command = data['salt-command']
use_salt_api = data['use-salt-api']
salt_master = data['salt-master']
if use_salt_api == 'True':
    api = Pepper('http://' + salt_master  + ':8080')
    api.login('salt','saltmaster','pam')
    # cmd.run example
    print(api.low([{'client': 'local','tgt': '*','fun': 'cmd.run','arg': 'touch test'}]))
else:
 print("don't invoke the salt api, print this string to let you know we are in testing mode")
 print(salt_command)
