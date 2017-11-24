import logging,sys
from rest_framework import generics
from ..serializers import HostSerializer
from ..models import Host
from ..models import StateType
from ..models import State


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Host.objects.all()
    serializer_class = HostSerializer
    def perform_create(self, serializer):
       statetype_set = StateType.objects.all()
       host = serializer.save()
       for statetype in statetype_set.iterator():
           state = State()
           state.statetype = statetype
           state.name = statetype.name
           state.installed = False
           state.host = host
           state.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Host.objects.all()
    serializer_class = HostSerializer
