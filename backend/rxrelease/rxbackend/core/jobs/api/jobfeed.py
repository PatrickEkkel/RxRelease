import logging,sys,os,time
from datetime import datetime
from .job import Job
from ...restapi.REST_states import REST_states
from ....configuration.globalsettings import NetworkSettings,LocalSettings
from .action import Action
from ...rxfilestore import RxFileStore

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class JobFeed:
    def __init__(self):
     self.localuser=LocalSettings.localuser
     self.filestore = RxFileStore('/home/' + self.localuser + '/.rxrelease')
     self.filestore.createDir('jobfeed/')
     self.filestore.setContext('/jobfeed')
     self.backendlocation = NetworkSettings.protocol + "://" + NetworkSettings.servername + ":" + NetworkSettings.port

    def pollJobCompleted(self,textfile,statetypeRequest):
     statesApi = REST_states()
     pollingState = True

     polling_frequenty = 5
     max_pollingtime  = 4
     polling_counter = 0
     job_failed = False
     latestFilename = textfile.getFilename()
     while pollingState:
         time.sleep(polling_frequenty)
         logger.info("checking task  " + latestFilename + " for completion")
         # query the rest interface for the status of the current action
         state =   statesApi.getStateByHostAndStateTypeId(statetypeRequest.getHostId(),statetypeRequest.getStateTypeId())
         print(state)
         if state[0]['installed'] == True:
             print("task " + latestFilename + " succesfully installed")
             break
         if polling_counter == max_pollingtime:
             job_failed = True
             break
         polling_counter += 1
         # when job is failed, we need to setup a plan to recover from this failed state,
         if job_failed:
             pass

     return not job_failed


    def getLatestJobTask(self,job):
     # get all the files that are associated with this job
     filestorelocation = '/home/' + self.localuser + '/.rxrelease/'
     jobfeedRunnerDir = filestorelocation + '/jobfeed'

     dirlist =   os.listdir(jobfeedRunnerDir)
     previous_date = 0
     jobname = job.getName()
     for i in dirlist:
           date = i.replace(jobname,'').replace('_','')
           if "trigger" not in i:
            current_date = int(date)
            if current_date > previous_date:
             previous_date = current_date
     latestFilename = str(previous_date) + "_" + jobname
     textfile = self.filestore.openTextFile(latestFilename)
     return textfile


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
