from rest_framework import generics
from ..serializers import DemoOnDemandSerializer
from ..serializers import DemoOnDemandVMSerializer
from ..serializers import DemoOnDemandEmtpyResponseVMSerializer
from ..models import DemoOnDemandUser
from ..models import DemoOnDemandVM
import logging
import sys
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

class PowerCycleVM(generics.UpdateAPIView):
    serializer_class = DemoOnDemandEmtpyResponseVMSerializer
    def perform_update(self, serializer):
        manager = ForemanManager.ForemanManager()
        user_id = self.kwargs['pk']
        queryset = DemoOnDemandUser.objects.filter(id=user_id)
        manager.powerCycleVM(queryset.first().dodenv.host)

    def get_queryset(self):
         user_id = self.kwargs['pk']
         queryset = DemoOnDemandUser.objects.filter(id=user_id)
         return queryset

class CreateHost(generics.CreateAPIView):
    serializer_class = DemoOnDemandEmtpyResponseVMSerializer
    def perform_create(self,serializer):
     manager = ForemanManager.ForemanManager()
     user_id = self.kwargs['pk']
     dodUser = DemoOnDemandUser.objects.filter(id=user_id).first()
     foremanHost =  manager.createNewVM()
     foremanHost.save()
     dodVM = DemoOnDemandVM()
     dodVM.host = foremanHost
     dodVM.save()
     dodUser.dodenv = dodVM
     dodUser.save()

class DemoUserEnvironmentView(generics.RetrieveAPIView):

    serializer_class = DemoOnDemandSerializer
    def get_queryset(self):
     manager = ForemanManager.ForemanManager()
     user_id = self.kwargs['pk']
     queryset = DemoOnDemandUser.objects.filter(id=user_id)
     manager.updateVMStatus(queryset.first().dodenv.host)
     queryset = DemoOnDemandUser.objects.filter(id=user_id)
     return queryset
