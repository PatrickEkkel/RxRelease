from rest_framework import generics
from ..serializers import KVSettingsSerializer
from ..models import KVSetting

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = KVSetting.objects.all()
    serializer_class = KVSettingsSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = KVSetting.objects.all()
    serializer_class = KVSettingsSerializer

class SearchView(generics.ListAPIView):
    serializer_class = KVSettingsSerializer
    def get_queryset(self):
        category_id =  self.request.query_params.get('category_id', None)
        category_name = self.request.query_params.get('category_name',None)
        if category_name is not None:
         result_queryset = KVSetting.objects.filter(category__name=category_name)
         return result_queryset
        elif category_id is not None:
         result_queryset = KVSetting.objects.filter(category_id=category_id)
         return result_queryset
        else:
         return KVSetting.objects.all()
