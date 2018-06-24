from rest_framework import generics
from ..serializers import WizardStatusSerializer
from ..models import WizardStatus

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = WizardStatus.objects.all()
    serializer_class = WizardStatusSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()


class SearchView(generics.ListAPIView):
    serializer_class = WizardStatusSerializer
    def get_queryset(self):
        wizard_id =  self.request.query_params.get('wizard_id', None)
        if wizard_id is not None:
         result_queryset = WizardStatus.objects.filter(wizard_id=wizard_id)
         return result_queryset
        else:
         return WizardStatus.objects.all()

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = WizardStatus.objects.all()
    serializer_class = WizardStatusSerializer
