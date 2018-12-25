from .scheduler_client import SchedulerClient
from ..api import jobActionFactory
from ..statetypes.handlerrequest import HandlerRequest
from ..api.keyvallistbuilder import KeyValListBuilder
from ..api.jobfactory import JobFactory

class ActionFactory:

    def __init__(self):
     pass

    def create_action_from_environment(self,env):
     action_builder = ActionBuilder()

     action_builder.host_id = env.host[0]['id']
     action_builder.ipaddress = env.host[0]['ipaddress']
     action_builder.statetype_id = env.statetype[0]['id']
     action_builder.handler_command = env.statetype[0]['handler']
     action_builder.settings_dict =  str(env.settings_dict)

     return action_builder.build()
    def create_action(self,host,statetype):
     return None

class ActionBuilder:

    def __init__(self):
     self.host_id = 0
     self.statetype_id = 0
     self.ipaddress = None
     self.handler = None
     self.dryrun = False
     self.handler_command = None
     self.job_type = None
     self.kvbuilder  = KeyValListBuilder()
     self.settings_dict = None

    def add_kv(self,key,value):
     self.kvbuilder.addKeyValPair(key,value)
    #def build_from_environment(self,environment):
    # return self.build()
    def build(self):
     handler_request = HandlerRequest()

     handler_request.setIpAddress(self.ipaddress)
     handler_request.setHostId(self.host_id)
     handler_request.setStateTypeId(self.statetype_id)
     handler_request.setHandlerCommand(self.handler_command)

     jobfactory = JobFactory()
     newJob = jobfactory.createNewJob("StateHandlerJob")
     actionFactory = jobActionFactory.JobActionFactory(newJob)
     #self.kvbuilder.addKeyValPair("remoteuser",'rxrelease')
     if self.settings_dict is None:
      handler_request.setKeyValList(self.kvbuilder.build())
     else:
      handler_request.setKeyValList(self.settings_dict)

     #kvbuilder.addKeyValPair("username",'salt')
     #kvbuilder.addKeyValPair("password",'testpass')
     #kvbuilder.addKeyValPair("dryrun","False")
     action = actionFactory.createAction('INSTALL','test',handler_request.getAsPayload())
     return action



class SchedulerService:

    def __init__(self):
     self.client = SchedulerClient()
     # TODO: later instelbaar maken natuurlijk
     self.client.connect("localhost")
     pass
    def schedule_state(self,action):
     #handler_request.setKeyValList(kvbuilder.build())
     #jobfactory = JobFactory()
     #newJob = jobfactory.createNewJob("StateHandlerJob")
     #actionFactory = jobActionFactory.JobActionFactory(newJob)
     #action = actionFactory.createAction('INSTALL','test',handler_request.getAsPayload())
     self.client.send_message(str(action))
