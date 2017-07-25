from rest_framework import serializers
from .models import ForemanSettings
from .models import ForemanHost

class ForemanHostSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForemanHost
        fields = ('foreman_host_id','status')

class ForemanSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForemanSettings
        fields = ('username','password','foremanUrl','name','hostgroup_id')
