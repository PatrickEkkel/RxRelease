import os.path
import logging
import sys
import ntpath
from shutil import copyfile
from .textfile import TextFile
from .binaryfile import BinaryFile
from ...configuration.globalsettings import NetworkSettings,LocalSettings,ApiUserSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


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

 def get_current_context(self):
     return self.location + '/' + self.context

 def copy_file(self,file):
     copyfile(file,self.location + self.context + "/" + ntpath.basename(file))
     return self.location + self.context + "/" + ntpath.basename(file)

 def open_text_file(self,file,overwrite=False):
     filelocation = self.location + self.context + '/' + file
     logger.debug('open file: ' + filelocation)
     result = TextFile(filelocation)
     if not overwrite:
         logger.debug('open file in append mode')
         result.openOrCreate()
         result.close()
     else:
         logger.debug('open file in overwrite mode')
         result.overwriteOrCreate()
         result.close()

     return result

 def new_binary_file(self,file):
     result = BinaryFile(self.location + self.context + "/" + file)
     result.open_or_create()
     result.close()
     return result

 def new_text_file(self,file,overwrite=False):
     result = TextFile(self.location + self.context + "/" + file)
     if not overwrite:
         result.create()
         result.close()
     else:
         result.overwriteOrCreate()
         result.close()

     return result

 def create_dir(self,dir):
     newPath = self.location + self.context + dir
     print(newPath)
     if not os.path.exists(newPath):
         os.makedirs(newPath)


 def get_filestore_location_with_context(self):
     return self.location + self.context + "/"


 def get_filestore_location(self):
     return self.location
