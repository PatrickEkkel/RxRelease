from rest_framework import serializers
from .models import DockerComposeConfiguration
from ..serializers import ConfigurationSerializer


class DockerComposeEmptySerializer(serializers.ModelSerializer):
    class Meta:
        model = DockerComposeConfiguration
        fields = ()

class DockerComposeConfigurationSerialiser(serializers.ModelSerializer):

    class Meta:
        configuration = ConfigurationSerializer()
        model = DockerComposeConfiguration
        fields = ('id','dockercomposeyaml', 'configuration')
