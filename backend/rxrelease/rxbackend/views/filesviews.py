import json
from rest_framework import generics
from rest_framework import views
from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status

from rxbackend.serializers import FileSerializer
from rxbackend.models import File
from rxbackend.core.io.rxfilestore import RxFileStore
from rxbackend.core.io.rxlocalstore import RxLocalStore


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def perform_create(self, serializer):
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = File.objects.all()
    serializer_class = FileSerializer


class FileUpdateView(views.APIView):

    def put(self,request,*args,**kwargs):
        data = self.request.data
        content = data['content']
        path = data['path']
        filename = data['filename']
        storage = RxLocalStore.get_or_create_dir_from_localstore(path)
        file_handle = storage.open_text_file(filename)
        file_handle.write(content)

        return Response({'data': content})
class FileDownloadView(views.APIView):

    def get(self, request, format=None):

        path = self.request.query_params.get('path')
        filename = self.request.query_params.get('filename')
        storage = RxLocalStore.get_or_create_dir_from_localstore(path)
        textfile = storage.open_text_file(filename)
        content = textfile.getContent()
        return Response({'data': content})

class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, *args, **kwargs):
        file_obj = request.FILES['file']

        boundary = file_obj.content_type.split(';')[1]
        boundary_id = boundary.split('=')[1]

        filestore = RxFileStore.get_instance()

        filestore.create_dir('files')
        filestore.set_context('files')
        file_handle = filestore.new_text_file(str(file_obj))

        file_contents = file_obj.read()

        for line in file_obj:
            decoded_string = line.decode('utf-8')
            if not decoded_string.startswith('--' + boundary_id) \
            and not decoded_string.startswith('Content-Disposition'):
                file_handle.write(str(line.decode('utf-8')))

        file_record = File.objects.create(filename=file_handle.getFilename(),
        path=file_handle.get_location())
        file_record.save()
        return Response({'id': file_record.id,'filename': file_record.filename,'path': file_record.path})
