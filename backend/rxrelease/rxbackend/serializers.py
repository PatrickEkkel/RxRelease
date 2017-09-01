from rest_framework import serializers
from .models import Profile
from .models import Host
from .models import Configuration
from .models import Capability
from .models import State
from .models import ProfileType
from .models import StateType
from .models import KVSetting
from .models import SettingsCategory
from .viewmodels import StateTypeHandler


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

class HostStateHandlerSerializer(serializers.ModelSerializer):

    class Meta:
        model = StateTypeHandler
        fields = ("host_id","statetype_id","keyvalList","handlerType","handlerCommand")


class StateTypeMTMSerializer(serializers.PrimaryKeyRelatedField,serializers.ModelSerializer):

    class Meta:
        model = StateType
        fields = ('id','name')

class StateTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = StateType
        fields = ('id','name')

class CapabilitySerializer(serializers.ModelSerializer):
    statetypes = StateTypeMTMSerializer(many=True,queryset=StateType.objects.all())
    class Meta:
        model = Capability
        fields = ('id','name','module','statetypes')


class StateSerializer(serializers.ModelSerializer):

    #capabilities = CapabilityMTMSerializer(many=True,queryset=Capability.objects.all())
    class Meta:

        model = State
        fields = ('id','name','installed','host')

class SettingsCategorySerializer(serializers.ModelSerializer):
    class Meta:

        model = SettingsCategory
        fields = ('id','name')
class KVSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        category = SettingsCategorySerializer
        model = KVSetting
        fields = ('id','key','value','category')


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('name','profiletype','id')
