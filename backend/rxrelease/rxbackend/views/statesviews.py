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
                print(state.name)
                payload = str(state.host)
                action = actionFactory.createAction('INSTALL',state.name,payload)
                jobfeed.newJobTask(action)
        # call jobfeed, with the correct parameters
        return  stateobject_queryset

class HostView(generics.ListAPIView):
    serializer_class = StateSerializer
    def get_queryset(self):
        host_id = self.kwargs['host_id']
        return State.objects.filter(host_id=host_id)
