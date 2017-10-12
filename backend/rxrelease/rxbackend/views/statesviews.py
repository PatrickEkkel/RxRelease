import logging,sys,os.path
from rest_framework import generics
from ..serializers import StateSerializer
from ..serializers import InstallHostSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import State
from ..viewmodels import StateTypeHandler
from ..core.jobs.api.jobfeed import JobFeed
from ..core.jobs.api.job import Job
from ..core.jobs.api import jobActionFactory
from ..core.jobs.statetypes.handlerrequest import HandlerRequest
from ..core.jobs.statetypes.requestbuilder import RequestBuilder

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
                 handlerRequest = RequestBuilder().buildRequest(state)
                 action = actionFactory.createAction('INSTALL',state.name,handlerRequest.getAsPayload())
                 jobfeed.newJobTask(action)
        jobfeed.triggerJob(newJob)
        # call jobfeed, with the correct parameters
        return  stateobject_queryset

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
