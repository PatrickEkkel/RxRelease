import zmq,logging,sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class SchedulerClient:

    def __init__(self):
     self.context = zmq.Context()
     self.socket = self.context.socket(zmq.REQ)
     self.port = '5556'
    def connect(self,address):
     self.socket.connect ("tcp://" + address + ":%s" % self.port)


    def send_message(self,message):


        self.socket.send_string(message)
        message = self.socket.recv()
        logger.debug("recieved message: " + str(message))
