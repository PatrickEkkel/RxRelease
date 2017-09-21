from action import Action

class JobActionFactory:
    def __init__(self,job):
     self.job = job

    def createAction(self,actionType,command,payload):
     result = Action()
     result.setJob(self.job)

     actionCommand = actionType + ":"  + command + ":" + payload
     result.setCommand(actionCommand)
     return result
