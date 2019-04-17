import sys, logging
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from .models import SaltSettings
from .models import SaltFormula
from .models import SaltMinion
from .viewmodels import SaltAction
from ..models import Host
from ..models import File
from ..serializers import HostTestSerializer
from ..serializers import FileMTMSerializer
from ..serializers import FileSerializer

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SaltActionSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaltAction
        fields = ('action', 'minion', 'test')


class SaltFormulasSerializer(serializers.ModelSerializer):
    # files  = serializers.SlugRelatedField(
    # many=True,
    # slug_field='filename',
    # queryset=File.objects.all())
    # files = FileMTMSerializer(many=True, queryset=File.objects.all())
    files = FileSerializer(many=True)

    class Meta:
        model = SaltFormula
        fields = ('id', 'name', 'status', 'files')

    def create(self, validated_data):
        files_data = validated_data.pop('files')

        newSaltFormula = SaltFormula.objects.create(**validated_data)

        for file_data in files_data:
            newFile = File.objects.create()
            newFile.path = file_data['path']
            newFile.filename = file_data['filename']
            newFile.save()
            newSaltFormula.files.set(newFile)
        return newSaltFormula

    def update(self, instance, validated_data):
        files_data = validated_data.pop('files')

        instance.name = validated_data['name']
        instance.status = validated_data['status']

        for file_data in files_data:
            try:
                existing_file = instance.files.filter(filename=file_data['filename']).get()
                logger.debug('existing file')
                existing_file.save()
            except ObjectDoesNotExist:
                logger.debug('new file')
                logger.debug(file_data)
                newFile = File.objects.create(
                    filename=file_data['filename'],
                    path=file_data['path'])
                instance.files.add(newFile)
        instance.save()
        return instance


class SaltMinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaltMinion
        fields = ('id', 'minion_id', 'accepted', 'host')


class SaltSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaltSettings
        fields = ('id', 'saltmaster')
