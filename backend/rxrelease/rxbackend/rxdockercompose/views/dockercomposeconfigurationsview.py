from rest_framework import generics
from ..serializers import DockerComposeConfigurationSerialiser
from ..serializers import DockerComposeEmptySerializer
from ..models import DockerComposeConfiguration
from ...ssh.ssh import SSHClient


class TestSSHLib(generics.CreateAPIView):
    serializer_class = DockerComposeEmptySerializer
    def perform_create(self, serializer):
     client = SSHClient('192.168.178.77','rxrelease')
     client.sendFile()
     #client.sendCommand('touch testfile')
     #client.sendCommand('echo "even testen of dit wel gaat werken" >> testfile')
     client.close()
class DeployConfiguration(generics.CreateAPIView):
    def perform_create(self, serializer):
        serializer_class = DockerComposeEmptySerializer
        client = SSHClient('192.168.178.77','rxrelease')
        client.sendFile()
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
