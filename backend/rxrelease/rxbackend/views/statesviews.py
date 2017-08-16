from rest_framework import generics
from ..serializers import StateSerializer
from ..models import State

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = State.objects.all()
    serializer_class = StateSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = State.objects.all()
    serializer_class = StateSerializer

class HostView(generics.ListAPIView):
    serializer_class = StateSerializer
    def get_queryset(self):
        host_id = self.kwargs['host_id']
        return State.objects.filter(host_id=host_id)
