import datetime

class Action:

    def __init__(self):
     pass
    def setJob(self,job):
     self.job = job
    def getJob(self):
     return self.job
    def setCommand(self,command):
     self.command = command
    def __str__(self):
        return str(datetime.datetime.utcnow()) + "_" + self.command + "_" + self.job.getName()
