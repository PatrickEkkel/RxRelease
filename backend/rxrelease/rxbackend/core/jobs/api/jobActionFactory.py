from .action import Action
from .job import Job


class JobActionFactory:
    def __init__(self, job):
        self.job = job

    def createActionFromInputMapping(self, input_mapping):
         mapping.host_id
         mapping.ipaddress
         mapping.state_id
         result = Action()

         return result

    def createActionFromString(self, line):
        jobname = line.split('_')[2]
        job = Job(jobname)

        lineElements = line.split('_')[1].split(':')
        actionType = lineElements[0]
        command = lineElements[1]
        payload = lineElements[2]
        actionCommand = actionType + ":" + command + ":" + payload
        result = Action()
        result.setPayload(payload)
        result.setJob(job)
        result.setActionType(actionType)
        result.setCommand(actionCommand)
        print(str(result))
        return result

    def createAction(self, actionType, command, payload):
        result = Action()
        result.setJob(self.job)
        actionCommand = actionType + ":" + command + ":" + payload
        result.setActionType(actionType)
        result.setCommand(actionCommand)
        return result
