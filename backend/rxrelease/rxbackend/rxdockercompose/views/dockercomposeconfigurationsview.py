from rest_framework import generics
from ..serializers import DockerComposeConfigurationSerialiser
from ..models import DockerComposeConfiguration


class TestSSHLib(generics.CreateAPIView):
    def perform_create(self, serializer):
     pass

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = DockerComposeConfiguration.objects.all()
    serializer_class = DockerComposeConfigurationSerialiser

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = DockerComposeConfiguration.objects.all()
    serializer_class = DockerComposeConfigurationSerialiser
