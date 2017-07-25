from rest_framework import serializers
from .models import DockerComposeConfiguration


class DockerComposeEmptySerializer(serializers.ModelSerializer):
    class Meta:
        model = DockerComposeConfiguration
        fields = ()

class DockerComposeConfigurationSerialiser(serializers.ModelSerializer):

    class Meta:
        model = DockerComposeConfiguration
        fields = ('id','dockercomposeyaml')
