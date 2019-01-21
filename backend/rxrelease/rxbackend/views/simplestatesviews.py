import logging,sys,os.path
from rest_framework import generics
from ..serializers import StateSerializer
from ..serializers import SimpleStateSerializer
from ..serializers import InstallHostSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import SimpleState
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
    queryset = SimpleState.objects.all()
    serializer_class = SimpleStateSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = SimpleState.objects.all()
    serializer_class = SimpleStateSerializer
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
