from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory

class JobDefinition:

    def __init__(self,jobHandler,jobname):
     self.jobHandler = jobHandler
     self.jobName = jobname

    def getJobName(self):
     return self.jobName

    def getHandler(self):
     return self.jobHandler

    def is_message_reciever(self,message):
     job_actionfactory = JobActionFactory(None)
     action =  job_actionfactory.createActionFromString(message)
     # pretty nasty, TODO: deze tekens moeten eruit en zijn van een legacy voor ZMQ
     recieved_jobname =  action.getJob().getName().strip('\'')
     current_jobname = self.jobName
     if recieved_jobname == current_jobname:
         return True
     else:
        return False
