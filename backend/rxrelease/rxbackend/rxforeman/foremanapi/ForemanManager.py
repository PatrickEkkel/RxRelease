from .ForemanApi import *
from ..models import ForemanSettings
from ..models import ForemanHost
import logging
import sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class ForemanManager:

 def __init_(self):
  pass
 def powerCycleVM(self,foremanHost):
    settings = ForemanSettings.objects.first()
    ha =  HostApi(foremanHost.foreman_host_id,settings)
    ha.powerCycle()

 def updateVMStatus(self,foremanHost):
    settings = ForemanSettings.objects.first()
    ha =  HostApi(foremanHost.foreman_host_id,settings)
    status = ha.getStatus()
    logger.debug("current status for host" + foremanHost.foreman_host_id +  ": " + str(status))
    foremanHost.status = status
    foremanHost.save()
 def createNewVM(self):
  settings = ForemanSettings.objects.first()
  #settings = ForemanSettings()
  api = ForemanApi(settings)
  hostApi = api.createHost()
  hostApi.powerOn()
  dodVM = ForemanHost()
  dodVM.foreman_host_id  = hostApi.getHostId()
  return dodVM
