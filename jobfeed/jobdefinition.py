from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes
from backend.rxrelease.rxbackend.core.restapi.REST_states import REST_states
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory


import logging,sys,time
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class JobDefinition:

    def __init__(self,jobname):
     #self.jobHandler = jobHandler
     self.jobName = jobname

    def getJobName(self):
     return self.jobName

    def pollJobCompleted(self,auth_token,action):

     payload =  action.getPayload()
     statetypeRequest = HandlerFactory().createRequest(payload)
     statesApi = REST_states(auth_token)
     result = 'STATE_NOT_EXECUTED'

     pollingState = True
     polling_frequenty = 5
     max_pollingtime  = 4
     polling_counter = 0
     job_failed = False
     while pollingState:
         time.sleep(polling_frequenty)
         logger.info("checking task  " + self.jobName + " for completion")
         state = statesApi.getStateByHostAndStateTypeId(statetypeRequest.getHostId(),statetypeRequest.getStateTypeId())
         print(state)
         if state[0]['installed'] == True:
             print("task " + latestFilename + " succesfully installed")
             result = "STATE_INSTALLED"
             break
         if polling_counter == max_pollingtime:
             job_failed = True
             result = "STATE_FAILED"
             break
         polling_counter += 1
         # when job is failed, we need to setup a plan to recover from this failed state,
         #if job_failed:
     return result



    #def getHandler(self):
    # return self.jobHandler
    def process_message(self,action,session):
        session = session.get_session()
        logger.debug("Starting job: " + self.getJobName())
        logger.debug("session: " + str(session.session_id) + " started at: " + str(session.session_start))
        statetypesApi = REST_statetypes(session.auth_token)
        return self.pollJobCompleted(session.auth_token,action)

    def is_message_reciever(self,message):
     job_actionfactory = JobActionFactory(None)
     action =  job_actionfactory.createActionFromString(message)
     # pretty nasty, TODO: deze tekens moeten eruit en zijn van een legacy voor ZMQ
     recieved_jobname =  action.getJob().getName().strip('\'').strip('"')
     #logger.debug("recieved_jobname: " + recieved_jobname)
     #logger.debug("current_jobname: " + self.jobName)
     current_jobname = self.jobName
     if recieved_jobname == current_jobname:
         return True
     else:
        return False
