from rest_framework import serializers
from .models import Profile
from .models import Host
from .models import Configuration


class ConfigurationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Configuration
        fields = ('name','profile')


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('name','type','id')

class HostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Host
        fields = ('hostname','ipaddress','description')
