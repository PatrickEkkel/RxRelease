import logging,sys,pyinotify
from .jobdefinition import JobDefinition
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory



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
    def __init__(self,fs_location):
     self.jobList = []
     self.filestorelocation = fs_location
     self.jobfeedRunnerDir = self.filestorelocation + '/jobfeed'
    def registerJob(self,job,name):
     self.jobList.append(JobDefinition(job,name))
    def run(self):
     for jobDef in self.jobList:
      logger.info("Registering notifier for " + jobDef.getJobName())
      wm = pyinotify.WatchManager()
      notifier = pyinotify.Notifier(wm, jobDef.getHandler())
      # Dit wellicht ook uit de filestore halen
      wdd = wm.add_watch(self.jobfeedRunnerDir + '/' + 'trigger_' + jobDef.getJobName(), pyinotify.IN_CLOSE_WRITE)
      notifier.loop()
