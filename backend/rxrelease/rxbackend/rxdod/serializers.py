from rest_framework import serializers
from .models import DemoOnDemandUser
from .models import DemoOnDemandVM
from ..serializers import HostSerializer

class DemoOnDemandVMSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoOnDemandVM
        fields = ()
        host = HostSerializer(required=False)

class DemoOnDemandSerializer(serializers.ModelSerializer):

    class Meta:
        model = DemoOnDemandUser
        fields = ('username','email','dodenv')
        dodenv = DemoOnDemandVMSerializer(required=False)
