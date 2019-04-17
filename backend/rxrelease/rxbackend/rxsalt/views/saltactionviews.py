from rest_framework import generics
from ..models import SaltMinion
from ..serializers import SaltActionSerializer


class CreateView(generics.CreateAPIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = SaltActionSerializer

    def perform_create(self, serializer):
        pass
        """Save the post data when creating a new bucketlist."""
        #serializer.save()
