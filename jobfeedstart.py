import pyinotify
import ntpath
import os
import time
import logging,sys
from dateutil.parser import parse
from jobfeed.jobdefinition import JobDefinition
from backend.rxrelease.rxbackend.core.rxfilestore import RxFileStore
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes
from backend.rxrelease.rxbackend.core.restapi.REST_states import REST_states

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
actionFactory = JobActionFactory(None)
requestFactory = HandlerFactory()

localuser='patrick'
filestorelocation = '/home/' + localuser + '/.rxrelease/'
jobfeedRunnerDir = filestorelocation + '/jobfeed'

statetypesApi = REST_statetypes()
statesApi = REST_states()

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

            statetypeRequest =  requestFactory.createRequest(payload)
            # at this point we are getting work done at the client and we need to start polling if the process is done

            statetypesApi.postHandleHostState(statetypeRequest)
            pollingState = True

            polling_frequenty = 5
            max_pollingtime  = 4
            polling_counter = 0
            job_failed = False

            while pollingState:
                time.sleep(polling_frequenty)
                logger.info("checking task  " + latestFilename + " for completion")
                # query the rest interface for the status of the current action
                state =   statesApi.getStateByHostAndStateTypeId(statetypeRequest.getHostId(),statetypeRequest.getStateTypeId())
                print(state)
                if state[0]['installed'] == True:
                 print("task " + latestFilename + " succesfully installed")
                 break
                if polling_counter == max_pollingtime:
                 job_failed = True
                 break
                polling_counter += 1
            # when job is failed, we need to setup a plan to recover from this failed state,
            if job_failed:
             pass

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
