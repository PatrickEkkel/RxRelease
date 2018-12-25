import logging,sys,pyinotify
from threading import Thread
from time import sleep
from .jobdefinition import JobDefinition
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from backend.rxrelease.rxbackend.core.jobs.zmq.scheduler_server import SchedulerServer



logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
actionFactory = JobActionFactory(None)
requestFactory = HandlerFactory()

class Dispatcher:
    def __init__(self,session):
     #self.jobList = []
     self.scheduler_server = SchedulerServer(session)
     #self.filestorelocation = fs_location
     #self.jobfeedRunnerDir = self.filestorelocation + '/jobfeed'
    def registerJob(self,job):
     #jobdefinition = JobDefinition(name)
     #self.jobList.append(jobdefinition)
     self.scheduler_server.register_messagehandler(job)

    def run(self):
     self.scheduler_server.start()
     #thread = Thread(target = self.run_zmq_reciever,args = (10, ))
     #thread.start()
     #thread.join()
     #for jobDef in self.jobList:
     # logger.info("Registering notifier for " + jobDef.getJobName())
     # wm = pyinotify.WatchManager()
     # notifier = pyinotify.Notifier(wm, jobDef.getHandler())
      # Dit wellicht ook uit de filestore halen
     # wdd = wm.add_watch(self.jobfeedRunnerDir + '/' + 'trigger_' + jobDef.getJobName(), pyinotify.IN_CLOSE_WRITE)
     # notifier.loop()
