#!/usr/bin/python3
import sys
import json

ipaddress = sys.argv[1]
keyvallist = sys.argv[2]

data = json.loads(keyvallist)
dryrun = data["dryrun"]


print(ipaddress)
print(dryrun)
print(data["username"])
print(data["password"])
