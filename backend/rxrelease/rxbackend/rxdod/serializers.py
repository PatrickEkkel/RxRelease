from rest_framework import serializers
from .models import DemoOnDemandUser
from .models import DemoOnDemandVM
from ..rxforeman.serializers import ForemanHostSerializer

class DemoOnDemandEmtpyResponseVMSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoOnDemandVM
        fields = ()


class DemoOnDemandVMSerializer(serializers.ModelSerializer):
    host = ForemanHostSerializer(required=False)
    class Meta:
        model = DemoOnDemandVM
        fields = ('id','url','host')


class DemoOnDemandSerializer(serializers.ModelSerializer):
    dodenv = DemoOnDemandVMSerializer(required=False)

    class Meta:
        model = DemoOnDemandUser
        fields = ('username','email','dodenv')
