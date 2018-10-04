from rest_framework import generics
from ..serializers import CredentialsSettingsSerializer
from ..models import CredentialsSetting

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = CredentialsSetting.objects.all()
    serializer_class = CredentialsSettingsSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
class SearchView(generics.ListAPIView):
    serializer_class = CredentialsSettingsSerializer
    def get_queryset(self):
        category_id =  self.request.query_params.get('category_id', None)
        if category_id is not None:
         result_queryset = CredentialsSetting.objects.filter(category_id=category_id)
         return result_queryset
        else:
         return SettingsCategory.objects.all()
class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = CredentialsSetting.objects.all()
    serializer_class = CredentialsSettingsSerializer
