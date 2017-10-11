import logging,sys,os
from datetime import datetime
from .job import Job
from .action import Action
from ..rxfilestore import RxFileStore

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

# TODO: dit is natuurlijk niet handig, we moeten de localuser ophalen via een methode of ergens global definieren
localuser="patrick"

class JobFeed:
    def __init__(self):
     self.filestore = RxFileStore('/home/' + localuser + '/.rxrelease')
     self.filestore.createDir('jobfeed/')
     self.filestore.setContext('/jobfeed')


    def triggerJob(self,job):
     filename =  job.getName()
     filename = "trigger" "_" + filename
     textfile = self.filestore.openTextFile(filename)
     textfile.writeLine("RUNJOB")

     pass
    def newJobTask(self,action):
     filename = action.getJob().getName()
     filename = datetime.now().strftime("%Y%m%d%H%M%S") + "_" + filename
     # write the jobaction to specific commandfile with the timestamp from the current datetime
     textfile =  self.filestore.openTextFile(filename)
     textfile.writeLine(str(action))
