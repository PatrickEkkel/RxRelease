import logging, sys
from ast import literal_eval
from .scheduler_client import SchedulerClient
from ..api import jobActionFactory
from ..api.utils import Utils
from ..statetypes.handlerrequest import HandlerRequest
from ..api.keyvallistbuilder import KeyValListBuilder
from ..api.jobfactory import JobFactory

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class ActionFactory:

    def __init__(self):
        pass

    def create_action_from_host(self, host, settings_dict, statetype):
        action_builder = ActionBuilder()
        action_builder.host_id = host[0]['id']
        action_builder.ipaddress = host[0]['ipaddress']
        action_builder.job_type = "SaltHandlerJob"
        action_builder.statetype_id = statetype[0]["id"]
        action_builder.handler_command = statetype[0]["handler"]
        action_builder.settings_dict = str(settings_dict)

        return action_builder.build()

    def create_action_from_environment(self, env):
        action_builder = ActionBuilder()

        action_builder.host_id = env.host[0]['id']
        action_builder.ipaddress = env.host[0]['ipaddress']
        action_builder.statetype_id = env.statetype[0]['id']
        action_builder.handler_command = env.statetype[0]['handler']
        action_builder.settings_dict = str(env.settings_dict)
        action_builder.job_type = "StateHandlerJob"

        return action_builder.build()

    def create_action(self, host, statetype):
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
        self.kvbuilder = KeyValListBuilder()
        self.settings_dict = None

    def add_kv(self, key, value):
        self.kvbuilder.addKeyValPair(key, value)

    # def build_from_environment(self,environment):
    # return self.build()
    def build(self):

        handler_request = HandlerRequest()

        handler_request.setIpAddress(self.ipaddress)
        handler_request.setHostId(self.host_id)
        handler_request.setStateTypeId(self.statetype_id)
        handler_request.setHandlerCommand(self.handler_command)

        jobfactory = JobFactory()
        if self.job_type is None:
            logger.debug("job type is not set, assuming default StateHandlerJob")
            self.job_type = "StateHandlerJob"

        newJob = jobfactory.createNewJob(self.job_type)

        actionFactory = jobActionFactory.JobActionFactory(newJob)
        # self.kvbuilder.addKeyValPair("remoteuser",'rxrelease')

        if self.settings_dict is None:
            logger.debug("Settings is not set building kv from scratch")
            handler_request.setKeyValList(Utils.escapeJsonForTransport(self.kvbuilder.build()))
        else:
            logger.debug("importing settings direct from the settings_dict")
            for key, value in literal_eval(self.settings_dict).items():
                self.add_kv(key, value)
            handler_request.setKeyValList(Utils.escapeJsonForTransport(self.kvbuilder.build()))

        action = actionFactory.createAction('INSTALL', 'test', handler_request.getAsPayload())
        return action


class SchedulerService:

    def __init__(self):
        self.client = SchedulerClient()
        # TODO: later instelbaar maken natuurlijk
        self.client.connect("localhost")
        pass

    def schedule_state(self, action):
        # handler_request.setKeyValList(kvbuilder.build())
        # jobfactory = JobFactory()
        # newJob = jobfactory.createNewJob("StateHandlerJob")
        # actionFactory = jobActionFactory.JobActionFactory(newJob)
        # action = actionFactory.createAction('INSTALL','test',handler_request.getAsPayload())
        self.client.send_message(str(action))
