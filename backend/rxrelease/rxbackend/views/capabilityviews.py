from rest_framework import generics
from ..serializers import CapabilitySerializer
from ..models import Capability

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Capability.objects.all()
    serializer_class = CapabilitySerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Capability.objects.all()
    serializer_class = CapabilitySerializer
