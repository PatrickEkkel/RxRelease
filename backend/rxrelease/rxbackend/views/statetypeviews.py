import logging, sys
import os.path
from django.db.models.signals import post_save
from rest_framework import generics
from ..serializers import StateTypeSerializer
from ..serializers import HostSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import StateType
from ..models import State
from ..models import Host
from ..models import Capability
from ..core import statehandler
from ..plugins.statetypeservice import StateTypeService

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class HandleHostState(generics.CreateAPIView):
    serializer_class = HostStateHandlerSerializer

    def perform_create(self, serializer):
        validated_data = serializer.validated_data

        host_queryset = Host.objects.filter(id=validated_data['host_id'])
        statetype_queryset = StateType.objects.filter(id=validated_data['statetype_id'])
        logger.info("Retrieving Capability for state_type: " + str(validated_data['statetype_id']))
        selected_capability = Capability.objects.filter(
            statetypes=validated_data['statetype_id']).get()
        selected_state = State.objects.filter(host=validated_data['host_id'],
                                              statetype=validated_data['statetype_id']).get()
        selected_statetype = statetype_queryset.get()
        selected_host = host_queryset.get()
        keyval_list = validated_data['keyvalList']
        handlerCommand = validated_data['handlerCommand']
        # default capabilities are handles from the root of the rxbackend project, the rest is channeled to the various plugin folders
        programroot = ''
        if selected_statetype.module == 'default':
            programroot = 'rxbackend.statehandlers'
        else:
            programroot = 'rxbackend.' + selected_statetype.module + '.statehandlers'
        stateHandler = statehandler.StateHandler(programroot)
        stateHandler.handlePythonState(selected_state, selected_host, handlerCommand, keyval_list)
        # todo add some kind of json parsing to the keyval_list
        logger.debug("Handling State for host " + selected_host.ipaddress)


class CreateCustomStateType(generics.CreateAPIView):
    serializer_class = StateTypeSerializer

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        print(validated_data)
        logger.debug('create custom statetype called')
        """Save the post data when creating a new bucketlist."""
        serializer.save()


def save_custom_statetype(sender, instance, **kwargs):
    statetype_service = StateTypeService()
    # system statetypes should be provisioned from  scratch
    if not instance.system:
        statetype_service.create_custom_statetype(instance)


post_save.connect(save_custom_statetype, sender=StateType)


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


class SearchByHostnameView(generics.ListAPIView):
    serializer_class = HostSerializer

    def get_queryset(self):
        pass
        name = self.request.query_params.get('name', None)
        statetype_queryset = Statetype.objects.filter(name=name)
        return statetype_queryset


class SearchbyNameView(generics.ListAPIView):
    serializer_class = StateTypeSerializer

    def get_queryset(self):
        pass
        name = self.request.query_params.get('name', None)
        statetype_queryset = StateType.objects.filter(name=name)
        return statetype_queryset

class SearchView(generics.ListAPIView):
    serializer_class = StateTypeSerializer

    def get_queryset(self):
        system_statetypes =  self.request.query_params.get('system', None)
        capability =    self.request.query_params.get('capability', None)
        system_statetypes = system_statetypes == 'True'
        filter = False
        if system_statetypes is not None:
            result_queryset = StateType.objects.filter(system=system_statetypes)
            filter = True

        if capability is not None and system_statetypes is not None:
            filter = True
            result_queryset = Capability.objects.filter(id=capability).get().statetypes.filter(system=system_statetypes)#.statetypes
                #.filter(system=system_statetypes)

        if not filter:
            return StateType.objects.all
        else:
            return result_queryset
