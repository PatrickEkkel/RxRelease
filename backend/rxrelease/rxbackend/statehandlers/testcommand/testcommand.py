#!/usr/bin/python3
import sys
import json
import sh
from rxbackend.core.jobs.api.jobfeed import JobFeed
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import NetworkSettings
from rxbackend.core.jobs.statehandlers.inputmapper import InputMapper

inputmapping = InputMapper().getInputFromCLI()

reststates_api = REST_states()
state = reststates_api.getStateByHostAndStateId(inputmapping.getGetHostId(),inputmapping.getStateId())
#update state to ready

state  =  state[0]
state['installed'] = True
reststates_api.putState(state)

print("state json object")
data = json.loads(inputmapping.getKeyvalList())
dryrun = data["dryrun"]

print(inputmapping.getIpAddress())
print(dryrun)
print(data["username"])
print(data["password"])
