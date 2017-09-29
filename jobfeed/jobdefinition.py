

class JobDefinition:

    def __init__(self,jobHandler,jobname):
     self.jobHandler = jobHandler
     self.jobName = jobname

    def getJobName(self):
     return self.jobName

    def getHandler(self):
     return self.jobHandler
