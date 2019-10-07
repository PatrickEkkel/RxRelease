import json
from jobfeed.messagebus import MessageBusClient, MessageBusReceiver



mbc = MessageBusClient()


mbc.connect('127.0.0.1')
#reciever_info = mbc.advertise_listener('127.0.0.1', 'testlistener')

mbc.send_message('testlistener','testberichtje')


# setup reciever
