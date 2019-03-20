import logging,paramiko,sh,sys,json
from rest_framework import generics
from rest_framework.response import Response
from ..serializers import KVSettingsSerializer
from ..models import KVSetting


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class UpdateView(generics.UpdateAPIView):
    def put(self, request, *args, **kwargs):

        data = self.request.data
        _key = data['key']
        kv_setting = KVSetting.objects.get_or_create(key=_key)
        kv_setting.value = data['value']
        kv_setting.save()
        return Response(kv_setting)


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

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
class SearchView(generics.ListAPIView):
    serializer_class = KVSettingsSerializer
    def get_queryset(self):
        category_id =  self.request.query_params.get('category_id', None)
        category_name = self.request.query_params.get('category_name',None)
        setting_key = self.request.query_params.get('settings_key',None)
        if setting_key is not None and category_name is not None:
            result_queryset = KVSetting.objects.filter(category__name=category_name,key=setting_key)
            return result_queryset
        elif category_name is not None:
         result_queryset = KVSetting.objects.filter(category__name=category_name)
         return result_queryset
        elif category_id is not None:
         result_queryset = KVSetting.objects.filter(category_id=category_id)
         return result_queryset
        else:
         return KVSetting.objects.all()
