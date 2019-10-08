import zmq, time, logging, sys, time, json
import socket
import threading as threading



logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class MessageBusBroker:
    def _get_next_free_port(self):
        result = self.port_pointer
        self.port_pointer += 1
        return result


    def worker(self):
        while True:
            message = self.socket.recv()
            logger.debug("Received request: %s" % message)

            j = json.loads(message.decode().replace("'","\""))
            if j['message_type'] == 'ANNOUNCE':
                logger.debug('recieved announce message')
                free_port = self._get_next_free_port()
                result = {'port': str(free_port),'entry': message.decode() }
                json_result = json.dumps(result)
                logger.debug('reciever ' + j['ident'] + ' announced in routing table')
                self.routing_entries[j['ident']] = json_result
                self.socket.send_string(json_result)

            elif j['message_type'] == 'DELIST':
                logger.debug('received DELIST request for ' + str(j['ident']))
                del self.routing_entries[j['ident']]
                self.socket.send_string(json_result)

            elif j['message_type'] == 'BROADCAST':
                logger.debug('recieved broadcast message')
                self.socket.send_string('MESSAGE OK')
                for entry in self.routing_entries.values():
                    self._relay_message(entry,j['payload'])
                #self.socket.send_string('MESSAGE OK')

            elif j['message_type'] == 'DATA':
                logger.debug('recieved data message')
                ident = j['ident']
                routing_entry = self.routing_entries.get(j['ident'])
                self.socket.send_string('MESSAGE OK')
                self._relay_message(routing_entry,j['payload'])

    def _create_local_zmq_context(self):
        local_context = zmq.Context()
        local_socket = local_context.socket(zmq.REQ)
        return {'local_context': local_context, 'local_socket': local_socket}

    def _relay_message(self, routing_entry, payload):
        local_context = self._create_local_zmq_context()

        routing_entry_json = json.loads(routing_entry)
        entry = json.loads(routing_entry_json['entry'].replace("'","\""))
        connection_string = 'tcp://' + entry['location'] + ':' + routing_entry_json['port']
        local_context['local_socket'].connect(connection_string)
        logger.debug('connecting to: ' + connection_string)
        local_context['local_socket'].send_string(payload)
        logger.debug('message relayed succesfully to ' + connection_string)

    def __init__(self):
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.REP)
        self.port = "5558"
        self.port_range_start = 6000
        self.port_range_end  = 7000
        self.port_pointer = self.port_range_start
        self.routing_entries = {}
        self.socket.bind("tcp://*:%s" % self.port)
        logger.debug('Starting MessageBus on port ' + self.port)

        logger.debug("Starting listening thread")
        t = threading.Thread(target=self.worker)
        t.start()

class MessageBusReceiver:
    def __init__(self,receiver_info, local_context):
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.REP)
        self.port = receiver_info['port']
        self.socket.bind("tcp://*:%s" % self.port)
        self.local_context = local_context

    def listen_once(self, action):
        result = self.socket.recv()
        action(result, self.local_context, self)

class MessageBusClient:

    def __init__(self):
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.REQ)
        self.port = '5558'

    def connect(self,address):
        self.socket.connect ("tcp://" + address + ":%s" % self.port)

    def advertise_listener(self, location, ident):
        message = {"location": location,"ident": ident,"message_type": 'ANNOUNCE'}
        self.socket.send_string(str(message))
        message = self.socket.recv()
        return message

    def delist_listener(self,ident):
        message = {"ident": ident, "message_type": 'DELIST'}
        self.socket.send_string(str(message))
        message = self.socket.recv()
        return message

    def send_message_to_all(self, payload):
        message = {"ident": 'ALL', "payload": payload, "message_type": 'BROADCAST'}
        self.socket.send_string(str(message))
        message = self.socket.recv()
        logger.debug("recieved message: " + str(message))


    def send_message(self, ident, payload):
        message = {"ident": ident, "payload": payload, "message_type": 'DATA'}
        self.socket.send_string(str(message))
        message = self.socket.recv()
        logger.debug("recieved message: " + str(message))
