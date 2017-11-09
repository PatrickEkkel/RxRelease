import pyinotify
import ntpath
import os
import time
import logging,sys
from dateutil.parser import parse
from jobfeed.jobdefinition import JobDefinition
from backend.rxrelease.rxbackend.core.rxfilestore import RxFileStore
from backend.rxrelease.rxbackend.core.jobs.api.jobfeed import JobFeed
from backend.rxrelease.rxbackend.core.jobs.api.jobfactory import JobFactory
from backend.rxrelease.rxbackend.configuration.globalsettings import NetworkSettings,LocalSettings
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes
#from backend.rxrelease.rxbackend.core.restapi.REST_states import REST_states

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
actionFactory = JobActionFactory(None)
requestFactory = HandlerFactory()

localuser=LocalSettings.localuser

filestorelocation = '/home/' + localuser + '/.rxrelease/'
jobfeedRunnerDir = filestorelocation + '/jobfeed'

statetypesApi = REST_statetypes()

filestore = RxFileStore(filestorelocation)
filestore.setContext('jobfeed')
class JobStateHandler(pyinotify.ProcessEvent):
    # evt has useful properties, including pathname
    def process_IN_CLOSE_WRITE(self, evt):
            print("Trigger Job for: " + ntpath.basename(evt.pathname))
            # remove trigger_ prefix from filename so we get the jobname
            basename = ntpath.basename(evt.pathname)
            jobname = basename.replace('trigger_','')

            jobfactory = JobFactory()
            job =  jobfactory.createNewJob(jobname)
            jobfeed = JobFeed()
            textfile = jobfeed.getLatestJobTask(job)

            actions = []
            for actionline in textfile.getLines():
                newAction = actionFactory.createActionFromString(actionline)
                actions.append(newAction)

            logger.info("amount of actions queued: " + str(len(actions)))

            for action in actions:
                runnableAction = action
                payload =  runnableAction.getPayload()

                statetypeRequest =  requestFactory.createRequest(payload)
                # at this point we are getting work done at the client and we need to start polling if the process is done
                statetypesApi.postHandleHostState(statetypeRequest)
                if jobfeed.pollJobCompleted(textfile,statetypeRequest) is False:
                    # call of all jobs currently handled by this trigger
                    logger.error("job: " + action.getCommand() + " has failed, check the logs for details")
                    break


jobname="StateHandlerJob"

jobList = []
jobList.append(JobDefinition(JobStateHandler(),jobname))


for jobDef in jobList:
 logger.info("Registering notifier for " + jobDef.getJobName())
 wm = pyinotify.WatchManager()
 notifier = pyinotify.Notifier(wm, jobDef.getHandler())
 # Dit wellicht ook uit de filestore halen
 wdd = wm.add_watch(jobfeedRunnerDir + '/' + 'trigger_' + jobDef.getJobName(), pyinotify.IN_CLOSE_WRITE)
 notifier.loop()
