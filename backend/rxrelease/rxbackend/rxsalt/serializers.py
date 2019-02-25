from rest_framework import serializers
from .models import SaltSettings
from .models import SaltFormula
from .models import SaltMinion
from ..models import Host
from ..models import File
from ..serializers import HostTestSerializer
from ..serializers import FileMTMSerializer


class SaltFormulasSerializer(serializers.ModelSerializer):
    files = FileMTMSerializer(many=True, queryset=File.objects.all())

    class Meta:
        model = SaltFormula
        fields = ('id', 'name', 'status', 'files')


class SaltMinionSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltMinion
        fields = ('id', 'minion_id', 'accepted', 'host')


class SaltSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltSettings
        fields = ('id', 'saltmaster')
