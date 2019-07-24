#!/usr/bin/python3
import sys
import json
import sh
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.restapi.REST_hosts import REST_hosts
from rxbackend.core.restapi.REST_statetypes import REST_statetypes
from rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.jobs.zmq.scheduler_service import ActionFactory
from rxbackend.core.restapi.REST_authentication import REST_authentication
from rxbackend.core.jobs.zmq.scheduler_service import SchedulerService


token_result = REST_authentication().postCredentials(ApiUserSettings.username, ApiUserSettings.password)
auth_token = token_result['token']

inputmapping = InputMapper().getInputFromCLI(auth_token)
data = json.loads(inputmapping.getKeyvalList())


reststates_api = REST_states(auth_token)
rest_hosts = REST_hosts(auth_token)
statetypes_api = REST_statetypes(auth_token)


action_factory = ActionFactory()

state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),
                                                inputmapping.getStateId())

payload = inputmapping.keyvallist

trigger_statetype = data['trigger-statetype']
trigger_host = data['trigger-host']

current_host = rest_hosts.get_host_by_id(inputmapping.host_id)
statetype = statetypes_api.getStatetypeByName(trigger_statetype)

print('print the dict and see if we are getting the stuff we are supposed to get')
for key, value in data.items():
    print(key, ":", value)

scheduler_service = SchedulerService()

salt_master = rest_hosts.get_host_by_hostname(trigger_host)
action = action_factory.create_action_from_host(salt_master, data, statetype)

scheduler_service.schedule_state(action)
statemanager = StateManager(auth_token)
state = state[0]
# TODO: get the Host object from the backend
statemanager.setRepeatableStateDone(state)
