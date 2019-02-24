import os.path
import ntpath
from shutil import copyfile
from .textfile import TextFile
from rxbackend.core.io.binaryfile import BinaryFile
from rxbackend.configuration.globalsettings import NetworkSettings,LocalSettings,ApiUserSettings



class RxFileStore:

 @staticmethod
 def get_instance():
     localuser = LocalSettings.localuser
     filestorelocation = '/home/' + localuser + '/.rxrelease/'
     return RxFileStore(filestorelocation)

 def __init__(self,location):
     self.location = location
     self.context = '/'
     if not os.path.exists(location):
          os.makedirs(location)

 def set_context(self,context):
     self.context = context

 def copy_file(self,file):
     copyfile(file,self.location + self.context + "/" + ntpath.basename(file))
     return self.location + self.context + "/" + ntpath.basename(file)

 def open_text_file(self,file):
     result = TextFile(self.location + self.context + "/" + file)
     result.openOrCreate()
     result.close()
     return result

 def new_binary_file(self,file):
     result = BinaryFile(self.location + self.context + "/" + file)
     result.open_or_create()
     result.close()
     return result

 def new_text_file(self,file):
     result = TextFile(self.location + self.context + "/" + file)
     result.create()
     result.close()
     return result

 def create_dir(self,dir):
     newPath = self.location + self.context + dir
     if not os.path.exists(newPath):
         os.makedirs(newPath)


 def get_filestore_location_with_context(self):
     return self.location + self.context + "/"


 def get_filestore_location(self):
     return self.location
