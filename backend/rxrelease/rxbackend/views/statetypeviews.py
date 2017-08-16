from rest_framework import generics
from ..serializers import StateTypeSerializer
from ..serializers import HostStateHandlerSerializer
from ..models import StateType


class HandleHostState(generics.CreateAPIView):
    serializer_class = HostStateHandlerSerializer
    def perform_create(self,serializer):
        validated_data = serializer.validated_data

        #validated_data['handlerType']

        print(validated_data['host_id'])

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
