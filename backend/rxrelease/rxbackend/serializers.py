from rest_framework import serializers
from .models import Profile
from .models import Host
from .models import Configuration


class HostTestSerializer(serializers.PrimaryKeyRelatedField,serializers.ModelSerializer):

    class Meta:
        model = Host
        fields = ('id','hostname','ipaddress','description')


class HostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Host
        fields = ('id','hostname','ipaddress','description')

class ConfigurationSerializer(serializers.ModelSerializer):
    hosts = HostTestSerializer(many=True,queryset=Host.objects.all())
    class Meta:
        model = Configuration
        fields = ('id','name','profile','hosts')


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('name','type','id')
