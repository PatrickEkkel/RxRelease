import logging, sys

from rest_framework import generics
from rest_framework import views

from ...core.jobs.api.jobfactory import JobFactory
from ...core.jobs.api import jobActionFactory
from ...core.jobs.zmq.scheduler_service import SchedulerService, ActionFactory
from ...core.jobs.statetypes.requestbuilder import RequestBuilder
from ...core.jobs.api.utils import Utils

from ...models import Host
from ...models import StateType
from ...models import KVSetting
from ...models import CredentialsSetting
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
        formula = data['formula']

        host = Host.objects.filter(hostname=minion).get()
        statetype = StateType.objects.filter(name='Salt-Run-State').get()
        credential_settings = CredentialsSetting.objects.filter(category__name='Salt Settings').get()


        request_builder = RequestBuilder()
        request_builder.kvbuilder.addKeyValPair('salt-username',credential_settings.username)
        request_builder.kvbuilder.addKeyValPair('salt-password',credential_settings.password)
        request_builder.kvbuilder.addKeyValPair('salt-function','APPLYSTATE')
        request_builder.kvbuilder.addKeyValPair('api-mode','SALTTESTDOCKER')
        request_builder.kvbuilder.addKeyValPair('salt-formula',formula)
        logger.debug('kvbuilder contents')
        logger.debug(request_builder.kvbuilder.build())
        handlerRequest = request_builder.build_request_with_host_and_statetype(host, statetype)

        scheduler_service = SchedulerService()

        jobfactory = JobFactory()
        newJob = jobfactory.createNewJob("SaltHandlerJob")
        action_factory = jobActionFactory.JobActionFactory(newJob)
        print('what is the contents of this keyvallist')
        print(handlerRequest.getKeyValList())
        handlerRequest.setKeyValList(Utils.escapeJsonForTransport(handlerRequest.getKeyValList()))
        action = action_factory.createAction('INSTALL', 'test', handlerRequest.getAsPayload())
        scheduler_service.schedule_state(action)
        return Response({'data': 'test'})
