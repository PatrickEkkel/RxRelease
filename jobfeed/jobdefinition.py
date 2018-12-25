from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes

import logging,sys
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

    #def getHandler(self):
    # return self.jobHandler
    def process_message(self,action,session):
        session = session.get_session()
        logger.debug("Starting job: " + self.getJobName())
        logger.debug("session: " + str(session.session_id) + " started at: " + str(session.session_start))
        statetypesApi = REST_statetypes(session.auth_token)


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
