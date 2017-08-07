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
        fields = ('id','hostname','ipaddress','description','status')

class ConfigurationSerializer(serializers.ModelSerializer):
    hosts = HostTestSerializer(many=True,queryset=Host.objects.all())

    class Meta:
        model = Configuration
        fields = ('id','name','profile','hosts')
    #def update(self,instance,validated_data):
    #    instance.name = validated_data.get('name',instance.name)
    #    for host in validated_data['hosts']:
    #        host = Host(hostname=host['hostname'],ipaddress=host['ipaddress'],description=host['description'],configuration=instance)
    #        print('eventesten')
    #        host.save()
    #    return instance

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('name','type','id')
