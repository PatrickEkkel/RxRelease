from rest_framework import generics
from ..models import SaltStateLog
from ..serializers import SaltStateLogSerializer


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = SaltStateLog.objects.all()
    serializer_class = SaltStateLogSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = SaltStateLog.objects.all()
    serializer_class = SaltStateLogSerializer


class LastResultView(generics.ListAPIView):
    serializer_class = SaltStateLogSerializer
    def get_queryset(self):
        name =  self.request.query_params.get('name', None)


        if name is not None:
            return SaltStateLog.objects.filter(saltstate=name).order_by('-start_date','-start_time')[:5]
        else:
            return SaltStateLog.objects.all()
