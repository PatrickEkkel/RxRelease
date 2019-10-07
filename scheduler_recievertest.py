import json
from jobfeed.messagebus import MessageBusClient, MessageBusReceiver



mbc = MessageBusClient()


mbc.connect('127.0.0.1')

reciever_info = mbc.advertise_listener('127.0.0.1', 'testlistener')
result = json.loads(reciever_info)

print('listening on port: ' + result['port'])
mbr = MessageBusReceiver(result)


def callback(message):
    print('callback called')
    print(message)


mbr.listen_once(callback)

# setup reciever
