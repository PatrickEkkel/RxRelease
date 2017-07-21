from rest_framework import generics
from ..models import ForemanSettings
from ..serializers import ForemanSettingsSerializer

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = ForemanSettings.objects.all()
    serializer_class = ForemanSettingsSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = ForemanSettings.objects.all()
    serializer_class = ForemanSettingsSerializer
