from rest_framework import generics
from ..models import SaltMinion
from ..serializers import SaltMinionSerializer


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = SaltMinion.objects.all()
    serializer_class = SaltMinionSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = SaltMinion.objects.all()
    serializer_class = SaltMinionSerializer

class SearchView(generics.ListAPIView):
    serializer_class = SaltMinionSerializer
    def get_queryset(self):
        minion_id =  self.request.query_params.get('minion_id', None)

        if minion_id is not None:
            return SaltMinion.objects.filter(minion_id=minion_id)
        else:
            return SaltMinion.objects.all()
