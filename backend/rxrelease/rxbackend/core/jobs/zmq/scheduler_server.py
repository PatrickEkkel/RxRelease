import zmq,time,logging,sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SchedulerServer:

    def __init__(self):
     self.context = zmq.Context()
     self.socket = self.context.socket(zmq.REP)
     self.port = "5556"
     self.socket.bind("tcp://*:%s" % self.port)
     self.handlers = []
    def register_messagehandler(self,handler):
     self.handlers.append(handler)
    def start(self):
     logger.debug("Starting ZMQ server in SERVER mode on port: " + self.port)
     while True:
         message = self.socket.recv()
         logger.debug(str(message))
         for handler in self.handlers:
          if handler.is_message_reciever(str(message)):
           self.socket.send_string("MESSAGE_OK")
         time.sleep(1)
