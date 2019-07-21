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


inputmapping = InputMapper().getInputFromCLI()

token_result = REST_authentication().postCredentials(ApiUserSettings.username, ApiUserSettings.password)
auth_token = token_result['token']

reststates_api = REST_states(auth_token)
rest_hosts = REST_hosts(auth_token)
statetypes_api = REST_statetypes(auth_token)


action_factory = ActionFactory()

state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),
                                                inputmapping.getStateId())

payload = inputmapping.keyvallist
print('laat maar eens zien wat hier inzit')
print(payload)

statetype_to_trigger = 'Salt-Run-State'
current_host = rest_hosts.get_host_by_id(inputmapping.host_id)


statetype = statetypes_api.getStatetypeByName(statetype_to_trigger)


settings_dict = {
    'dryrun': 'False'
    , 'salt-minion-id': current_host['hostname']
    , 'api-mode': 'PRODUCTION'
    , 'salt-function': 'ACCEPTMINION'
    , 'sshport': '22'
    , 'saltapiport': '8080'
    , 'salt-username': 'test'
    , 'salt-password': 'test'
    , 'test': 'False'
    , 'remoteuser': 'rxrelease'
}


scheduler_service = SchedulerService()

#current_host = [current_host]

salt_master =  rest_hosts.get_host_by_hostname('salt-master')
action = action_factory.create_action_from_host(salt_master, settings_dict, statetype)

scheduler_service.schedule_state(action)


statemanager = StateManager(auth_token)
state = state[0]
# TODO: get the Host object from the backend
statemanager.setRepeatableStateDone(state)
