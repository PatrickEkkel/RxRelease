from rest_framework import generics
from ..serializers import ProfileSerializer
from ..models import Profile

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class SearchView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    def get_queryset(self):
        name =  self.request.query_params.get('name', None)
        if name is not None:
            return Profile.objects.filter(name=name)
        else:
            return Profile.objects.all()
