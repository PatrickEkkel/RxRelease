from rest_framework import generics
from ..serializers import ConfigurationSerializer
from ..models import Configuration

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Configuration.objects.all()
    serializer_class = ConfigurationSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Configuration.objects.all()
    serializer_class = ConfigurationSerializer

class ProfileView(generics.ListAPIView):
    serializer_class = ConfigurationSerializer
    def get_queryset(self):
        profile_id = self.kwargs['profile_id']
        return Configuration.objects.filter(profile_id=profile_id)
