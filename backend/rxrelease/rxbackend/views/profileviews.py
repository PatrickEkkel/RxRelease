from rest_framework import generics
from ..serializers import ProfileSerializer
from ..models import Profile
from ..models import Host

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
        host_id = self.request.query_params.get('host_id', None)

        if name is not None:
            return Profile.objects.filter(name=name)
        elif host_id is not None:
            host_queryset = Host.objects.filter(id=host_id)
            if host_queryset.count() > 0:
                return [host_queryset.get().profile]
            else:
                return []
        else:
            return Profile.objects.all()
