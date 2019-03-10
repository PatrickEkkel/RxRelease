import logging,sys,os.path
from rest_framework import generics
from ..serializers import StateSerializer
from ..serializers import InstallHostSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import State
from ..models import Capability
from ..models import Host
from ..viewmodels import StateTypeHandler
from ..core.jobs.api.job import Job
from ..core.jobs.api.jobfactory import JobFactory
from ..core.jobs.api import jobActionFactory
from ..core.jobs.statetypes.handlerrequest import HandlerRequest
from ..core.jobs.statetypes.requestbuilder import RequestBuilder
from ..core.jobs.api.utils import Utils
from ..core.datastructures.tree.dependencytreemap import DependencyTreeMap
from ..core.jobs.zmq.scheduler_service import SchedulerService,ActionFactory

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class CreateView(generics.ListCreateAPIView):
    """This class defines th,e create behavior of our rest api."""
    queryset = State.objects.all()
    serializer_class = StateSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = State.objects.all()
    serializer_class = StateSerializer
# Everything is configured, now only thing that leaves us is to test this piece of entangled code
class InstallHostView(generics.UpdateAPIView):
    serializer_class = InstallHostSerializer
    def get_queryset(self):
        logger.info("installing host")
        host_id = self.kwargs['pk']
        # Get TheHost so we can the profiletype
        selected_host = Host.objects.filter(id=host_id).get()
        capabilities = selected_host.profileType.capabilities.all()

        capability_treemap = DependencyTreeMap()

        # sort the capabilities by dependency

        for capability in capabilities:
            parent = capability.dependentOn
            parent_id = None
            if parent == None:
                parent_id = -1
            else:
                parent_id = parent.id
            capability_treemap.addItem(capability.id,capability,parent_id)

        capability_treemap.merge()
        capabilityList = capability_treemap.toList()
        logger.debug("Amount of capabilities: " + str(len(capabilityList)))
        sorted_capability_statesmap = {}

        for kv in capabilityList:
            capability = kv[1]
            logger.debug("Current capability: " + str(capability))

            statetypes = capability.statetypes.all()
            # filter out repeatable states, they are not scheduled via the dependency tree
            capability_states = State.objects.filter(host_id=host_id).filter(statetype_id__in=statetypes,repeatable_state__isnull=True).all()

            sorted_capability_statesmap[capability.id] = []
            for state in capability_states:
                # get all the states that belong to this capability for
                logger.debug("found state: " + str(state))
                logger.debug("capability id: " + str(capability.id))
                sorted_capability_statesmap[capability.id].append(state)

        capability_queryset = Capability.objects.all()
        jobfactory = JobFactory()
        newJob = jobfactory.createNewJob("StateHandlerJob")

        actionFactory = jobActionFactory.JobActionFactory(newJob)

        treemap = DependencyTreeMap()
        logger.debug("found capabilities: " + str(len(sorted_capability_statesmap)))
        for key in sorted_capability_statesmap:
         logger.debug("how many states are being found: " + str(len(sorted_capability_statesmap[key])))
         logger.debug("current capability: " + str(key))
         for state in sorted_capability_statesmap[key]:
          logger.info("state: " + str(state))
          parent = state.statetype.dependentOn
          parent_id = None
          if parent == None:
           parent_id  = -1
          else:
           parent_id = parent.id
          treemap.addItem(state.statetype.id,state,parent_id)

        treemap.merge()
        statesList =  treemap.toList()

        scheduler_service = SchedulerService()
        for kv in statesList:
         # TODO: this is problematic for complex states,
         base_state = kv[1]
         simple_state = base_state.simple_state
         if simple_state.installed == False:
             print("state: " + str(state))
             if base_state.statetype.handler is not None:
              handlerRequest = RequestBuilder().buildRequest(base_state)
              logger.debug(str(handlerRequest))
              logger.debug("dit is het request in string formaat")
              # encode the request for transport
              handlerRequest.setKeyValList(Utils.escapeJsonForTransport(handlerRequest.getKeyValList()))
              action = actionFactory.createAction('INSTALL',state.name,handlerRequest.getAsPayload())
              scheduler_service.schedule_state(action)
             # call jobfeed, with the correct parameters
        return   Host.objects.filter(id=host_id)

class HostView(generics.ListAPIView):
    serializer_class = StateSerializer
    def get_queryset(self):
        host_id =  self.request.query_params.get('host_id', None)
        state_id = self.request.query_params.get('state_id', None)
        statetype_id = self.request.query_params.get('statetype_id',None)

        result_queryset = None
        # alleen host id
        if host_id is not None and state_id is None and statetype_id is None:
         result_queryset = State.objects.filter(host_id=host_id)
        # state_id,host_id
        if state_id is not None and host_id is not None:
         result_queryset = State.objects.filter(id=state_id).filter(host_id=host_id)
        # statetype_id,host_id
        if statetype_id is not None and host_id is not None:
         result_queryset = State.objects.filter(statetype_id=statetype_id).filter(host_id=host_id)

        return result_queryset
