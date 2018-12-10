import logging,sys,ntpath
from rxbackend.core.rxfilestore import RxFileStore
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
     self.filestore.createDir('template_parser')
     self.filestore.setContext('template_parser')
     copied_file = self.filestore.copyFile(file_location)
     logger.debug(copied_file)
     self.textfile = self.filestore.openTextFile(ntpath.basename(copied_file))

    def replace_tokens(self,key,value):
     lines = self.textfile.getLines()
     newFile = self.filestore.newTextFile('filled_salt_api_template.txt')
     self.file_handle = newFile.getFilename()
     for line in lines:
      newFile.write(line.replace(key,value))
     self.newFile = newFile
    def template_file(self):
     #return "blalala"
     return self.filestore.getFileStoreLocationWithContext() + self.newFile.getFilename()
