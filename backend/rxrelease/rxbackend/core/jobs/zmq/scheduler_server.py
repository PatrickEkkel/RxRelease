import zmq,time,logging,sys
import queue as queue
import threading as threading
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class Task:
    def __init__(self,handler,action):
     self.handler = handler
     self.action = action

class Worker:

    def __init__(self,session):
     self.q = queue.Queue()
     self.session = session
    def do_task(self,task):
     self.q.put(task)
    def start(self):
     logger.debug("Starting worker Thread")
     t = threading.Thread(target=self.run_worker)
     t.start()
     #self.run_worker() # Threading hierin zetten
    def run_worker(self):
     while True:
      logger.debug("Waiting for workitems")
      item = self.q.get()
      item.handler.process_message(item.action,self.session)
      self.q.task_done()
class SchedulerServer:

    def __init__(self,session):
     self.context = zmq.Context()
     self.socket = self.context.socket(zmq.REP)
     self.port = "5556"
     self.socket.bind("tcp://*:%s" % self.port)
     self.worker = Worker(session)

     self.handlers = []
    def register_messagehandler(self,handler):
     self.handlers.append(handler)
    def start(self):
     logger.debug("Starting ZMQ server in SERVER mode on port: " + self.port)
     self.worker.start()
     job_actionfactory = JobActionFactory(None)

     while True:
         message = self.socket.recv()
         logger.debug(str(message))
         for handler in self.handlers:
          if handler.is_message_reciever(str(message)):
           self.socket.send_string("MESSAGE_OK")
           action = job_actionfactory.createActionFromString(str(message))
           self.worker.do_task(Task(handler,action))
          else:
           self.socket.send_string("MESSAGE_NOT_OK")
         time.sleep(1)
