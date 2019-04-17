import logging,sys

from rest_framework import generics
from rest_framework import views


from ...core.jobs.api.jobfactory import JobFactory
from ...core.jobs.api import jobActionFactory
from ...core.jobs.zmq.scheduler_service import SchedulerService, ActionFactory
from ...core.jobs.statetypes.requestbuilder import RequestBuilder
from .. .core.jobs.api.utils import Utils

from ...models import Host
from ...models import StateType
from ...models import KVSetting
from ..models import SaltMinion
from ..serializers import SaltActionSerializer
from rest_framework.response import Response

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)



class CreateView(views.APIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = SaltActionSerializer

    def post(self, request, *args, **kwargs):
        data = self.request.data
        minion = data['minion']

        host = Host.objects.filter(hostname=minion).get()
        statetype =  StateType.objects.filter(name='Salt-Run-State').get()
        # ssh_port = KVSetting.objects.filter()
        logger.debug('host: ' + str(host.hostname))
        logger.debug('statetype: ' + str(statetype))
        handlerRequest = RequestBuilder().build_request_with_host_and_statetype(host,statetype)

        scheduler_service = SchedulerService()

        jobfactory = JobFactory()
        newJob = jobfactory.createNewJob("SaltHandlerJob")
        action_factory = jobActionFactory.JobActionFactory(newJob)


        # action = action_factory.create_action_from_host(salt_master, settings_dict, statetype)

        handlerRequest.setKeyValList(Utils.escapeJsonForTransport(handlerRequest.getKeyValList()))
        action = action_factory.createAction('INSTALL','test',handlerRequest.getAsPayload())

        scheduler_service.schedule_state(action)

        return Response({'data': 'test'})
        """Save the post data when creating a new bucketlist."""
        #serializer.save()
