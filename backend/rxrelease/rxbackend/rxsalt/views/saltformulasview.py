from rest_framework import generics
from ..models import SaltFormula
from ..serializers import SaltFormulasSerializer


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = SaltFormula.objects.all()
    serializer_class = SaltFormulasSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = SaltFormula.objects.all()
    serializer_class = SaltFormulasSerializer

class SearchView(generics.ListAPIView):
    serializer_class = SaltFormulasSerializer
    def get_queryset(self):
        formula_name =  self.request.query_params.get('name', None)

        if formula_name is not None:
            return SaltFormula.objects.filter(name=formula_name)
        else:
            return SaltMinion.objects.all()
