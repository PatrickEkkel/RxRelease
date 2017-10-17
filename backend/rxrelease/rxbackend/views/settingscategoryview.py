from rest_framework import generics
from ..serializers import SettingsCategorySerializer
from ..models import SettingsCategory

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = SettingsCategory.objects.all()
    serializer_class = SettingsCategorySerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = SettingsCategory.objects.all()
    serializer_class = SettingsCategorySerializer
class SearchView(generics.ListAPIView):
    serializer_class = SettingsCategorySerializer
    def get_queryset(self):
        category_name =  self.request.query_params.get('category_name', None)
        if category_name is not None:
         result_queryset = SettingsCategory.objects.filter(name=category_name)
         return result_queryset
        else:
         return SettingsCategory.objects.all()
