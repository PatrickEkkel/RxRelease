from .job import Job
class JobFactory:
    def __init__(self):
     pass
    def createNewJob(self,jobname):
      return Job(jobname)
