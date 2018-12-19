from .scheduler_client import SchedulerClient
from ..api import jobActionFactory
from ..statetypes.handlerrequest import HandlerRequest
from ..api.keyvallistbuilder import KeyValListBuilder
from ..api.jobfactory import JobFactory

class SchedulerService:

    def __init__(self):
     self.client = SchedulerClient()
     # TODO: later instelbaar maken natuurlijk
     self.client.connect("localhost")
     pass
    def schedule_state(self):
     handler_request = HandlerRequest()
     handler_request.setIpAddress('192.168.178.77')
     handler_request.setHostId(1)
     handler_request.setStateTypeId(5)
     handler_request.setHandlerCommand("install-salt-api.py")
     kvbuilder  = KeyValListBuilder()
     kvbuilder.addKeyValPair("remoteuser",'rxrelease')
     kvbuilder.addKeyValPair("username",'salt')
     kvbuilder.addKeyValPair("password",'testpass')
     kvbuilder.addKeyValPair("dryrun","False")
     handler_request.setKeyValList(kvbuilder.build())

     jobfactory = JobFactory()
     newJob = jobfactory.createNewJob("StateHandlerJob")
     actionFactory = jobActionFactory.JobActionFactory(newJob)
     action = actionFactory.createAction('INSTALL','test',handler_request.getAsPayload())
     self.client.send_message(str(action))
