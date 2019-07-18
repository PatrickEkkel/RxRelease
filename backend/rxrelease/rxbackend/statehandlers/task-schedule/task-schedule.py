#!/usr/bin/python3
import sys
import json
import sh
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.restapi.REST_statetypes import REST_statetypes
from rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.restapi.REST_authentication import REST_authentication

print('matig resultaat')

inputmapping = InputMapper().getInputFromCLI()

token_result = REST_authentication().postCredentials(ApiUserSettings.username, ApiUserSettings.password)
auth_token = token_result['token']

reststates_api = REST_states(auth_token)


state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),
                                                inputmapping.getStateId())

payload = inputmapping.getPayload()

statetypeRequest = HandlerFactory().createRequest(payload)

statetypesApi = REST_statetypes(auth_token)
statetypesApi.postHandleHostState(statetypeRequest)

# the actual code that schedules the task at the other host

statemanager = StateManager(auth_token)
# TODO: get the Host object from the backend
statemanager.schedule_state(state, 1)
statemanager.setRepeatableStateDone(state)
