from rest_framework import serializers
from .models import DockerComposeConfiguration

class DockerComposeConfigurationSerialiser(serializers.ModelSerializer):

    class Meta:
        model = DockerComposeConfiguration
        fields = ('id','dockercomposeyaml')
