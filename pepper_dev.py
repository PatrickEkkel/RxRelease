#!/usr/bin/python3
from pepper import Pepper


api = Pepper('http://172.25.232.89:8080')


print(api)


api.login('salt','testpass','pam')

# cmd.run example
#print(api.low([{'client': 'local','tgt': '*','fun': 'cmd.run','arg': 'ls -al'}]))

print(api.low([{'client': 'local','tgt': '172.25.232.89','fun': 'state.apply','arg': 'test'}]))
