import logging,sys,socket
from rest_framework import serializers
from .models import Profile
from .models import Host
from .models import Configuration
from .models import Capability
from .models import State
from .models import ProfileType
from .models import StateType
from .models import KVSetting
from .models import CredentialsSetting
from .models import SettingsCategory
from .viewmodels import StateTypeHandler
from .viewmodels import InstallHost

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

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
    def validate_ipaddress(self,value):
        try:
            socket.inet_aton(value)
        except socket.error:
            raise serializers.ValidationError("Not a valid IP Address")

        logger.debug("value of the ipaddress field = " + value)
        return value

    class Meta:
        model = Host
        fields = ('id','hostname','ipaddress','description','status','connectioncredentials')

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
        fields = ('id','name','handler','dependentOn','SettingsCategory')

class CapabilitySerializer(serializers.ModelSerializer):
    statetypes = StateTypeMTMSerializer(many=True,queryset=StateType.objects.all())
    class Meta:
        model = Capability
        fields = ('id','name','module','statetypes')

class InstallHostSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallHost
        fields = ('id','host_id')
class StateSerializer(serializers.ModelSerializer):
    #capabilities = CapabilityMTMSerializer(many=True,queryset=Capability.objects.all())
    class Meta:

        model = State
        fields = ('id','name','installed','host','statetype')

class SettingsCategorySerializer(serializers.ModelSerializer):
    class Meta:

        model = SettingsCategory
        fields = ('id','name')
class KVSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        category = SettingsCategorySerializer
        model = KVSetting
        fields = ('id','key','value','category')

class CredentialsSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        category = SettingsCategorySerializer
        model = CredentialsSetting
        fields = ('id','username','password','category')

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('name','profiletype','id')
