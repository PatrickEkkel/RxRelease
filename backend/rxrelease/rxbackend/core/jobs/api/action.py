import datetime

class Action:

    def __init__(self):
     pass
    def setActionType(self,actionType):
     self.actionType = actionType
    def setPayload(self,payload):
     self.payload = payload
    def getPayload(self):
     return self.payload
    def setJob(self,job):
     self.job = job
    def getJob(self):
     return self.job
    def setCommand(self,command):
     self.command = command
    def __str__(self):
        return str(datetime.datetime.utcnow()) + "_" + self.command + "_" + self.job.getName()
