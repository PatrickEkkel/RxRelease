#!/usr/bin/python3
import sys
import json
import sh
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

print(salt_command)
