import logging,sys,os.path
from rest_framework import generics
from ..serializers import StateSerializer
from ..serializers import InstallHostSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import State
from ..viewmodels import StateTypeHandler
from ..core.jobs.jobfeed import JobFeed
from ..core.jobs.job import Job
from ..core.jobs import jobActionFactory
from ..core.jobs.statetypehandlerrequest import StateTypeHandlerRequest
from ..core.jobs.statetyperequestbuilder import StateTypeRequestBuilder

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

class InstallHostView(generics.UpdateAPIView):
    serializer_class = InstallHostSerializer
    def get_queryset(self):
        host_id = self.kwargs['pk']
        #host_id = 1
        stateobject_queryset = State.objects.filter(host_id=host_id)

        # TODO: nog een JobFactory maken voor nu even dat ding gewoon instancieren
        newJob = Job("StateHandlerJob")

        actionFactory = jobActionFactory.JobActionFactory(newJob)
        jobfeed = JobFeed()
        # TODO: dit is nog niet af natuurlijk... verder mee gaan als de tijd er weer naar is
        for state in stateobject_queryset.all():
            if state.installed == False:
                if state.statetype.handler is not None:
                 #payload =  "hostid=" + str(state.host.id) + "," + "ipaddress=" + str(state.host.ipaddress) + "," + "statetypeid=" + str(state.statetype.id) + "," + "handlerCommand=" + state.statetype.handler
                 #handlerRequest = StateTypeHandlerRequest()
                 #handlerRequest.setIpAddress(state.host.ipaddress)
                 #handlerRequest.setHostId(state.host_id)
                 #handlerRequest.setStateTypeId(state.statetype_id)
                 #handlerRequest.setHandlerCommand(state.statetype.handler)
                 handlerRequest = StateTypeRequestBuilder().buildRequest(state)
                 action = actionFactory.createAction('INSTALL',state.name,handlerRequest.getAsPayload())
                 jobfeed.newJobTask(action)
        jobfeed.triggerJob(newJob)
        # call jobfeed, with the correct parameters
        return  stateobject_queryset

class HostView(generics.ListAPIView):
    serializer_class = StateSerializer
    def get_queryset(self):
        host_id = self.kwargs['host_id']
        return State.objects.filter(host_id=host_id)
