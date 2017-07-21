from rest_framework import serializers
from .models import ForemanSettings

class ForemanSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForemanSettings
        fields = ('username','password','foremanUrl','name','hostgroup_id')
