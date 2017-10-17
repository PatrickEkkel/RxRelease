from rest_framework import generics
from ..serializers import CredentialsSettingsSerializer
from ..models import CredentialsSetting

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = CredentialsSetting.objects.all()
    serializer_class = CredentialsSettingsSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = CredentialsSetting.objects.all()
    serializer_class = CredentialsSettingsSerializer
