import logging,sys,ntpath
from .io.rxfilestore import RxFileStore
from rxbackend.configuration.globalsettings import NetworkSettings,LocalSettings,ApiUserSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)



class TemplateParser:

    def __init__(self,file_location):
     localuser=LocalSettings.localuser
     self.filestorelocation = '/home/' + localuser + '/.rxrelease/'
     self.file_location = file_location
     self.filestore = RxFileStore(self.filestorelocation)
     self.filestore.create_dir('template_parser')
     self.filestore.set_context('template_parser')
     copied_file = self.filestore.copy_file(file_location)
     logger.debug(copied_file)
     self.textfile = self.filestore.open_text_file(ntpath.basename(copied_file))

    def replace_tokens(self,key,value):
     lines = self.textfile.getLines()
     newFile = self.filestore.new_text_file('filled_salt_api_template.txt')
     self.file_handle = newFile.getFilename()
     for line in lines:
      newFile.write(line.replace(key,value))
     self.newFile = newFile
    def template_file(self):
     return self.filestore.get_filestore_location_with_context() + self.newFile.getFilename()
