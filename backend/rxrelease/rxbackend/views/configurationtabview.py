from rest_framework import generics
from ..serializers import ConfigurationTabSerializer
from ..models import ConfigurationTab

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = ConfigurationTab.objects.all()
    serializer_class = ConfigurationTabSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = ConfigurationTab.objects.all()
    serializer_class = ConfigurationTabSerializer
