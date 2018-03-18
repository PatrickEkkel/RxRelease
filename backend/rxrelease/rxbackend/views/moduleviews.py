from rest_framework import generics
from ..serializers import ModuleSerializer
from ..models import Module

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class ModuleSearchView(generics.ListAPIView):
    serializer_class = ModuleSerializer
    def get_queryset(self):
        module_name =  self.request.query_params.get('name', None)
        result_queryset = Module.objects.filter(name=module_name)
        return result_queryset
