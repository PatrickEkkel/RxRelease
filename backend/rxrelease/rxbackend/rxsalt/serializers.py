from rest_framework import serializers
from .models import SaltSettings
from .models import SaltFormulas


class SaltFormulasSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaltFormulas
        fields = ('id','name','file','status')
class SaltSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltSettings
        fields = ('id','saltmaster')
