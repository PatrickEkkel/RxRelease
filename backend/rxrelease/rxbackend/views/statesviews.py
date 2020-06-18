import logging, sys, os.path
from rest_framework import generics
from ..serializers import StateSerializer
from ..serializers import InstallHostSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import State
from ..models import Capability
from ..models import Configuration
from ..models import Host
from ..viewmodels import StateTypeHandler
from ..core.jobs.api.job import Job
from ..core.jobs.api.jobfactory import JobFactory
from ..core.jobs.api import jobActionFactory
from ..core.jobs.statetypes.handlerrequest import HandlerRequest
from ..core.jobs.statetypes.requestbuilder import RequestBuilder
from ..core.jobs.api.utils import Utils
from ..core.datastructures.tree.dependencytreemap import DependencyTreeMap
from ..core.services.dependencyresolverservice import DependencyResolverService
from ..core.jobs.zmq.scheduler_service import SchedulerService, ActionFactory

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
        # get all capabilities

        accumulated_capabilties = []


        current_profile = selected_host.profile
        default_configuration = selected_host.profile.default_configuration


        while current_profile:
            capability = current_profile.default_configuration.capability
            #capabilities = [config.capability for config in Configuration.objects.filter(profile=current_profile).all()]
            #accumulated_capabilties.append(capability)
            if current_profile.inherited:
                current_profile = current_profile.inherited
                inherited_capability = current_profile.default_configuration.capability
                capability.dependentOn = inherited_capability
            else:
                current_profile = None
            accumulated_capabilties.append(capability)

        capability_treemap = DependencyTreeMap()

        # sort the capabilities by dependency
        logger.debug("accumulated_capabilties found for host")
        logger.debug(accumulated_capabilties)

        jobfactory = JobFactory()
        newJob = jobfactory.createNewJob("StateHandlerJob")

        actionFactory = jobActionFactory.JobActionFactory(newJob)

        drs = DependencyResolverService(accumulated_capabilties, host_id)
        statesList = drs.resolve()
        scheduler_service = SchedulerService()

        for kv in statesList:
            # TODO: this is problematic for complex states,
            base_state = kv[1]
            print("state: " + base_state.name)
            if base_state.simple_state is not None:
                simple_state = base_state.simple_state
                if simple_state.installed == False:
                    if base_state.statetype.handler is not None:
                        handlerRequest = RequestBuilder().build_request_with_state(base_state)
                        logger.debug(str(handlerRequest))
                        logger.debug("dit is het request in string formaat")
                        # encode the request for transport
                        handlerRequest.setKeyValList(
                            Utils.escapeJsonForTransport(handlerRequest.getKeyValList()))
                        action = actionFactory.createAction('INSTALL', base_state.name,
                                                        handlerRequest.getAsPayload())
                        scheduler_service.schedule_state(action)
            elif base_state.complex_state is not None:

                complex_state = base_state.complex_state
                complex_state_status = complex_state.status
                logger.debug('loading complex state with status: ' + complex_state.status)
                if complex_state_status == 'NOT_APPLIED':
                    if base_state.statetype.handler is not None:
                        handlerRequest = RequestBuilder().build_request_with_state(base_state)
                        logger.debug(str(handlerRequest))
                        logger.debug("dit is het request in string formaat")
                        handlerRequest.setKeyValList(
                            Utils.escapeJsonForTransport(handlerRequest.getKeyValList()))
                        action = actionFactory.createAction('INSTALL', base_state.name,
                                                            handlerRequest.getAsPayload())
                        scheduler_service.schedule_state(action)
                else:
                    logger.debug(f'complex state has state {complex_state_status}, state will be ignored for this run ')
                # call jobfeed, with the correct parameters
        return Host.objects.filter(id=host_id)


class HostView(generics.ListAPIView):
    serializer_class = StateSerializer

    def get_queryset(self):
        host_id = self.request.query_params.get('host_id', None)
        state_id = self.request.query_params.get('state_id', None)
        statetype_id = self.request.query_params.get('statetype_id', None)

        result_queryset = None
        # alleen host id
        if host_id is not None and state_id is None and statetype_id is None:
            result_queryset = State.objects.filter(host_id=host_id)
            #result_queryset = State.objects.none()
        # state_id,host_id
        if state_id is not None and host_id is not None:
            result_queryset = State.objects.filter(id=state_id).filter(host_id=host_id)
        # statetype_id,host_id
        if statetype_id is not None and host_id is not None:
            result_queryset = State.objects.filter(statetype_id=statetype_id).filter(
                host_id=host_id)

        return result_queryset
