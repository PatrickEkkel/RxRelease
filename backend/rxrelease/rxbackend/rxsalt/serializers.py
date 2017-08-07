from rest_framework import serializers
from .models import SaltSettings


class SaltSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltSettings
        fields = ('id','saltmaster')
