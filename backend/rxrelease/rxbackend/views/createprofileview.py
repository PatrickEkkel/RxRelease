from rest_framework import generics
from ..serializers import ProfileSerializer
from ..models import Profile

class CreateProfileView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
