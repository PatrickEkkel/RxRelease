#!/usr/bin/python3
from pepper import Pepper


api = Pepper('http://192.168.122.198:8080')

# api = Pepper('http://192.168.178.92:8080')


# print(api)


api.login('test', 'test', 'pam')


# run a command on the minion
#print(api.low([{'client': 'local','tgt': 'salt-master','fun': 'cmd.run','arg': 'salt state.apply utils test=True'}]))

# run connectivy test
# print(api.low([{'client': 'local', 'tgt': 'test-minion', 'fun': 'test.ping'}]))

#
#print(api.low([{'client': 'wheel', 'tgt': '*', 'fun': 'key.list_all'}]))
# accept minion
# print(api.low([{'client': 'wheel', 'tgt': '*', 'fun': 'key.accept', 'match': 'b9840e25adfd'}]))


print(api.low([{'client': 'local','tgt': 'salt-master','fun': 'state.apply','arg': ["utils","test=True"]}]))
