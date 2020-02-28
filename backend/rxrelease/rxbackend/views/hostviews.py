import logging, sys
from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from ..serializers import HostSerializer
from ..models import Host
from ..models import StateType
from ..models import State
from ..models import Capability
from ..models import Configuration
from ..core.services.stateservice import StateService

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


@method_decorator(csrf_exempt, name='dispatch')
class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Host.objects.all()
    serializer_class = HostSerializer

    def perform_create(self, serializer):
        # instead of taking all the statetypes, get the profiletype from the host,
        # and than get its capebilities which contains all relevant stateypes
        statetype_set = StateType.objects.all()
        host = serializer.save()
        stateservice = StateService()
        # TODO, hier waren we gebleven, we willen dit omhangen naar Profile
        # we need to get all the capabilities for all configurations
        configurations = Configuration.objects.filter(profile=host.profile)
        capabilities = []
        for configuration in configurations.iterator():
            capabilities.append(configuration.capability)
        #capabilities = host.profileType.capabilities
        # Get all the configurations via the profile TODO: hier

        for capability in capabilities:
            for statetype in capability.statetypes.iterator():
                logger.debug("statetype.jobtype " + statetype.jobtype)
                # TODO factory,dao? have to look at how to do this
                state = stateservice.create_state(statetype, host)


@method_decorator(csrf_exempt, name='dispatch')
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Host.objects.all()
    serializer_class = HostSerializer



class SearchByHostnameView(generics.ListAPIView):
    serializer_class = HostSerializer

    def get_queryset(self):
        pass
        hostname = self.request.query_params.get('hostname', None)
        host_queryset = Host.objects.filter(hostname=hostname)
        return host_queryset
