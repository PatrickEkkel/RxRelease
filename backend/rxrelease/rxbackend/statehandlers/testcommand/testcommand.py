#!/usr/bin/python3
import sys
import json
import sh
from rxbackend.core.jobs.api.jobfeed import JobFeed
from rxbackend.core.restapi.REST_states import REST_states
from rxbackend.configuration.globalsettings import NetworkSettings


#backend_url = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port
ipaddress = sys.argv[1]
state_id = sys.argv[2]
keyvallist = sys.argv[3]

reststates_api = REST_states()
state = reststates_api.getStateByHostAndStateId('1',state_id)
#update state to ready

print("current state object has the following value")
state  =  state[0]
state['installed'] = True
reststates_api.putState(state)

print("state json object")

data = json.loads(keyvallist)
dryrun = data["dryrun"]

print(ipaddress)
print(dryrun)
print(data["username"])
print(data["password"])
