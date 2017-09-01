import logging,sys
import os.path
from rest_framework import generics
from ..serializers import StateTypeSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import StateType
from ..models import Host
from ..models import Capability
from ..core import statehandler

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class HandleHostState(generics.CreateAPIView):
    serializer_class = HostStateHandlerSerializer
    def perform_create(self,serializer):
        validated_data = serializer.validated_data

        #validated_data['handlerType']
        selected_host = Host.objects.filter(id = validated_data['host_id']).get()
        statetype_queryset = StateType.objects.filter(id = validated_data['statetype_id'])
        selected_capability = Capability.objects.filter(statetypes = statetype_queryset).get()
        logger.info(selected_capability.module)
        keyval_list = validated_data['keyvalList']
        handlerCommand = validated_data['handlerCommand']
        # default capabilities are handles from the root of the rxbackend project, the rest is channeled to the various plugin folders
        programroot = ''
        if selected_capability.module == 'default':
            programroot = 'rxbackend/statehandlers/'
        else:
            programroot = 'rxbackend/' + selected_capability.module + '/statehandlers/'
        stateHandler = statehandler.StateHandler(programroot)
        stateHandler.handlePythonState(handlerCommand,selected_host.ipaddress,keyval_list)
        # todo add some kind of json parsing to the keyval_list

        logger.info("Handling State for host " +  selected_host.ipaddress)

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = StateType.objects.all()
    serializer_class = StateTypeSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = StateType.objects.all()
    serializer_class = StateTypeSerializer
