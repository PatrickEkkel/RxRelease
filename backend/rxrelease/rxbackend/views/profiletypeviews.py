from rest_framework import generics
from ..serializers import ProfileTypeSerializer
from ..models import ProfileType

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = ProfileType.objects.all()
    serializer_class = ProfileTypeSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = ProfileType.objects.all()
    serializer_class = ProfileTypeSerializer
