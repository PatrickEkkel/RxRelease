#!/usr/bin/python3
import sys
import json
import sh
import random
from rxbackend.configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.core.restapi.REST_hosts import REST_hosts
from rxbackend.core.restapi.REST_statetypes import REST_statetypes
from rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper
from rxbackend.core.jobs.statehandlers.statemanager import StateManager
from rxbackend.core.jobs.zmq.scheduler_service import ActionFactory
from rxbackend.core.jobs.zmq.messagebus import MessageBusReceiver, MessageBusClient
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

print('executing taks-schedule with the following context')
for key, value in data.items():
    print(key, ":", value)

scheduler_service = SchedulerService()

target = rest_hosts.get_host_by_hostname(trigger_host)

action = action_factory.create_action_from_host(target, data, statetype)

scheduler_service.schedule_state(action)

def callback(status, local_context, receiver):
    print('recieved callback from remote task')
    print('payload: ' + str(status))

    statemanager = StateManager(local_context['auth_token'])
    state = local_context['state'][0]
    # in the case of task-schedule.py we expect the payload to be the state status
    statemanager.setComplexStateStatus(state, str(status.decode()))
    client = MessageBusClient()
    client.connect('127.0.0.1')
    client.delist_listener(local_context['listener_id'])


messagebus_client = MessageBusClient()
# TODO: source these kind of connection information from a central source.
messagebus_client.connect('127.0.0.1')
listener_id = 'TASK_SCHEDULE_' + str(random.randint(1,100))
listener_info = messagebus_client.advertise_listener('127.0.0.1',listener_id)
listener_info = json.loads(listener_info)
messagebus_receiver = MessageBusReceiver(listener_info,{'auth_token': auth_token,'state': state,'listener_id': listener_id})

statemanager = StateManager(auth_token)
state = state[0]
# in the case of task-schedule.py we expect the payload to be the state status
statemanager.setComplexStateStatus(state, 'PENDING')

messagebus_receiver.listen_once(callback)
