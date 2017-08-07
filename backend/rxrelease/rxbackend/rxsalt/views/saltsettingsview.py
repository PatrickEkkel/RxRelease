from rest_framework import generics
from ..models import SaltSettings
from ..serializers import SaltSettingsSerializer

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = SaltSettings.objects.all()
    serializer_class = SaltSettingsSerializer
    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = SaltSettings.objects.all()
    serializer_class = SaltSettingsSerializer
