from rest_framework import generics
from ..serializers import DemoOnDemandSerializer
from ..serializers import DemoOnDemandVMSerializer
from ..models import DemoOnDemandUser
import logging
import sys
sys.path.append("../../")
from ...rxforeman.foremanapi import ForemanManager

logger = logging.getLogger(__name__)

logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)



class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = DemoOnDemandUser.objects.all()
    serializer_class = DemoOnDemandSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = DemoOnDemandUser.objects.all()
    serializer_class = DemoOnDemandSerializer


class CreateHost(generics.CreateAPIView):
    serializer_class = DemoOnDemandVMSerializer
    def perform_create(self,serializer):
     manager = ForemanManager.ForemanManager()
     manager.createNewVM()
     queryset = DemoOnDemandUser.objects.all()


class DemoUserEnvironmentView(generics.RetrieveAPIView):
    serializer_class = DemoOnDemandSerializer
    def get_queryset(self):
     user_id = self.kwargs['pk']
     return DemoOnDemandUser.objects.filter(id=user_id)
