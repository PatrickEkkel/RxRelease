import ntpath
import pyinotify
import logging,sys

from backend.rxrelease.rxbackend.core.jobs.api.jobfactory import JobFactory
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.api.jobfeed import JobFeed
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class JobStateHandler(pyinotify.ProcessEvent):


    def __init__(self,session):
        self.session = session
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
            actionFactory = JobActionFactory(None)
            requestFactory = HandlerFactory()
            statetypesApi = REST_statetypes(self.session.auth_token)



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
