import logging, sys, socket
from rest_framework import serializers
from .models import Profile
from .models import Host
from .models import File
from .models import Configuration
from .models import Capability
from .models import State
from .models import SimpleState
from .models import ComplexState
from .models import RepeatableState
from .models import StateType
from .models import KVSetting
from .models import CredentialsSetting
from .models import SettingsCategory
from .models import Module
from .models import WizardStatus
from .models import ConfigurationTab
from django.contrib.auth.models import User
from .viewmodels import StateTypeHandler
from .viewmodels import InstallHost

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class FileMTMSerializer(serializers.PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'filename', 'path')


class CapabilityMTMSerializer(serializers.PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = Capability
        fields = ('id', 'name',)


class HostTestSerializer(serializers.PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ('id', 'hostname', 'ipaddress', 'description')


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ('id', 'name', 'active', 'menuoptionname', 'configurationPanel','statetypePanel')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')



class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'filename', 'path')


class HostSerializer(serializers.ModelSerializer):

    def validate_ipaddress(self, value):
        try:
            socket.inet_aton(value)
        except socket.error:
            raise serializers.ValidationError("Not a valid IP Address")

        logger.debug("value of the ipaddress field = " + value)
        return value

    class Meta:
        model = Host
        fields = ('id', 'hostname', 'ipaddress', 'description', 'status',
                  'connectioncredentials', 'hostSettings','profile')


class ConfigurationSerializer(serializers.ModelSerializer):
    hosts = HostTestSerializer(many=True, queryset=Host.objects.all())

    class Meta:
        model = Configuration
        fields = ('id', 'name', 'profile', 'hosts','capability')


class HostStateHandlerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateTypeHandler
        fields = ("host_id", "statetype_id", "keyvalList", "handlerType", "handlerCommand")


class WizardStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = WizardStatus
        fields = ('id', 'wizard_id', 'wizard_status')


class StateTypeMTMSerializer(serializers.PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = StateType
        fields = ('id', 'name')


class StateTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateType
        fields = ('id', 'name', 'handler', 'module', 'dependentOn', 'state_settings', 'jobtype', 'system', 'connection_credentials')


class CapabilitySerializer(serializers.ModelSerializer):
    statetypes = StateTypeMTMSerializer(many=True, queryset=StateType.objects.all())

    class Meta:
        model = Capability
        fields = ('id', 'name', 'statetypes', 'dependentOn')


class InstallHostSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallHost
        fields = ('id', 'host_id')


class RepeatableStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepeatableState
        fields = ('id', 'last_successfull_run')


class ComplexStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplexState
        fields = ('id', 'status', 'last_successfull_run')


class SimpleStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimpleState
        fields = ('id', 'installed', 'last_successfull_run')


class StateSerializer(serializers.ModelSerializer):
    simple_state = SimpleStateSerializer(required=False, read_only=True)
    repeatable_state = RepeatableStateSerializer(required=False, read_only=True)
    complex_state = ComplexStateSerializer(required=False, read_only=True)
    statetype = StateTypeSerializer(required=False, read_only=True)

    class Meta:
        model = State
        fields = ('id', 'name', 'host', 'statetype', 'simple_state', 'repeatable_state','complex_state')


class SettingsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingsCategory
        fields = ('id', 'name', 'prefix')


class KVSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        category = SettingsCategorySerializer
        model = KVSetting
        fields = ('id', 'key', 'value', 'category')


class CredentialsSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        category = SettingsCategorySerializer
        model = CredentialsSetting
        fields = ('id', 'username', 'password', 'category')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name', 'id','inherited','default_configuration')


class ConfigurationTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigurationTab
        fields = ('id', 'tabname', 'component_tag', 'module')
