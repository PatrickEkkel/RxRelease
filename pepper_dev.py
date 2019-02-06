#!/usr/bin/python3
from pepper import Pepper


api = Pepper('http://192.168.178.92:8080')


#print(api)


api.login('salt','test','pam')

# cmd.run example
print(api.low([{'client': 'local','tgt': 'test-minion','fun': 'cmd.run','arg': 'ls -al'}]))
print(api.low([{'client': 'local', 'tgt': 'test-minion', 'fun': 'test.ping'}]))


#print(api.low([{'client': 'local','tgt': '192.168.178.77','fun': 'state.apply','arg': 'test'}]))
