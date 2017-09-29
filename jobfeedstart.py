import pyinotify
import ntpath
import os
import logging,sys
from dateutil.parser import parse
from jobfeed.jobdefinition import JobDefinition
from backend.rxrelease.rxbackend.core.rxfilestore import RxFileStore
from backend.rxrelease.rxbackend.core.jobs.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypehandlerfactory import StateTypeHandlerFactory
from backend.rxrelease.rxbackend.core.jobs.requestsender import RequestSender

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
actionFactory = JobActionFactory(None)
requestFactory = StateTypeHandlerFactory()

requestSender = RequestSender()


localuser='patrick'
filestorelocation = '/home/' + localuser + '/.rxrelease/'
jobfeedRunnerDir = filestorelocation + '/jobfeed'

filestore = RxFileStore(filestorelocation)
filestore.setContext('jobfeed')
class JobStateHandler(pyinotify.ProcessEvent):
    # evt has useful properties, including pathname
    def process_IN_CLOSE_WRITE(self, evt):
            print("Trigger Job for: " + ntpath.basename(evt.pathname))
            # remove trigger_ prefix from filename so we get the jobname
            basename = ntpath.basename(evt.pathname)
            jobname = basename.replace('trigger_','')
            # get all the files that are associated with this job
            dirlist =   os.listdir(jobfeedRunnerDir)

            previous_date = 0
            for i in dirlist:
                  date = i.replace(jobname,'').replace('_','')
                  if "trigger" not in i:
                   current_date = int(date)
                   if current_date > previous_date:
                    previous_date = current_date
            latestFilename = str(previous_date) + "_" + jobname
            textfile = filestore.openTextFile(latestFilename)
            logger.info("processing: " + latestFilename)

            actions = []

            for actionline in textfile.getLines():
                newAction = actionFactory.createActionFromString(actionline)
                actions.append(newAction)
            # for test try to run passwordless login
            runnableAction = actions[0]
            payload =  runnableAction.getPayload()

            stateTypeHandlerRequest =  requestFactory.createStateTypeHandlerRequest(payload)
            # at this point we are getting work done at the client and we need to start polling if the process is done
            requestSender.sendRequest(stateTypeHandlerRequest)







# TODO: localuser van een andere plek dan deze halen
jobname="StateHandlerJob"

jobList = []
jobList.append(JobDefinition(JobStateHandler(),jobname))


for jobDef in jobList:
 print("Registering notifier for " + jobDef.getJobName())
 wm = pyinotify.WatchManager()
 notifier = pyinotify.Notifier(wm, jobDef.getHandler())
 # Dit wellicht ook uit de filestore halen
 wdd = wm.add_watch(jobfeedRunnerDir + '/' + 'trigger_' + jobDef.getJobName(), pyinotify.IN_CLOSE_WRITE)
 notifier.loop()
