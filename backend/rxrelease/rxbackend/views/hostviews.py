import logging,sys
from rest_framework import generics
#from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from ..serializers import HostSerializer
from ..models import Host
from ..models import StateType
from ..models import State
from ..models import Capability
from ..models import ProfileType


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

    #profiletypes_queryset = ProfileType.objects.all()
    serializer_class = HostSerializer
    def perform_create(self, serializer):

        # instead of taking all the statetypes, get the profiletype from the host,
        # and than get its capebilities which contains all relevant stateypes
        # TODO: this change will cause problems to the dependency resolver,
        # fix this by adding dependendOn to capabilities and
       statetype_set = StateType.objects.all()
       host = serializer.save()
       capabilities = host.profileType.capabilities
       for capability in capabilities.iterator():
           logger.info("how many times is this one being called?")
           for statetype in capability.statetypes.iterator():
            #for statetype in statetype_set.iterator():
            state = State()
            state.statetype = statetype
            state.name = statetype.name
            state.installed = False
            state.host = host
            state.save()
@method_decorator(csrf_exempt, name='dispatch')
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Host.objects.all()
    serializer_class = HostSerializer

class SearchByProfiletypeView(generics.ListAPIView):
    serializer_class = HostSerializer
    def get_queryset(self):
        profiletype =  self.request.query_params.get('profiletype', None)
        profiletype_queryset = ProfileType.objects.filter(name=profiletype)
        host_queryset = None
        try:
         profiletype_result = profiletype_queryset.get()
         host_queryset = Host.objects.filter(profileType=profiletype_result.id)
        except ObjectDoesNotExist:
         host_queryset = None
        return host_queryset
