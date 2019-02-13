from rest_framework import serializers
from .models import SaltSettings
from .models import SaltFormulas
from .models import SaltMinion
from ..models import Host


class SaltFormulasSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaltFormulas
        fields = ('id', 'name', 'file', 'status')


class SaltMinionSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltMinion
        fields = ('id', 'minion_id', 'accepted', 'host_id')


class SaltSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltSettings
        fields = ('id', 'saltmaster')
