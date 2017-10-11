#!/usr/bin/python3
import sys
import json
import sh
from rxbackend.core.jobs.jobfeed import JobFeed
from rxbackend.core.jobs.requestsender import RequestSender
from rxbackend.configuration.globalsettings import NetworkSettings


backend_url = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port
ipaddress = sys.argv[1]
state_id = sys.argv[2]
keyvallist = sys.argv[3]
states_resource = "states/" + state_id

requestHandler = RequestSender()

state = requestHandler.getState(state_id)


#update state to ready


state['installed'] = True


requestHandler.updateState(state)


print("state json object")
#print(state)

data = json.loads(keyvallist)
dryrun = data["dryrun"]

print(ipaddress)
print(dryrun)
print(data["username"])
print(data["password"])
