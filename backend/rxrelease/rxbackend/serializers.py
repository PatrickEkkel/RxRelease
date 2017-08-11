from rest_framework import serializers
from .models import Profile
from .models import Host
from .models import Configuration
from .models import Capability
from .models import State
from .models import ProfileType

class CapabilityMTMSerializer(serializers.PrimaryKeyRelatedField,serializers.ModelSerializer):
    class Meta:
        model = Capability
        fields = ('id','name','module')

class HostTestSerializer(serializers.PrimaryKeyRelatedField,serializers.ModelSerializer):

    class Meta:
        model = Host
        fields = ('id','hostname','ipaddress','description')


class ProfileTypeSerializer(serializers.ModelSerializer):
    capabilities = CapabilityMTMSerializer(many=True,queryset=Capability.objects.all())
    class Meta:
        model = ProfileType
        fields  = ('id','name','capabilities')

class HostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Host
        fields = ('id','hostname','ipaddress','description','status')

class ConfigurationSerializer(serializers.ModelSerializer):
    hosts = HostTestSerializer(many=True,queryset=Host.objects.all())

    class Meta:
        model = Configuration
        fields = ('id','name','profile','hosts')
    #def update(self,instance,validated_data):
    #    instance.name = validated_data.get('name',instance.name)
    #    for host in validated_data['hosts']:
    #        host = Host(hostname=host['hostname'],ipaddress=host['ipaddress'],description=host['description'],configuration=instance)
    #        print('eventesten')
    #        host.save()
    #    return instance
class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('id','name','installed')


class CapabilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Capability
        fields = ('id','name','module')

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('name','profiletype','id')
