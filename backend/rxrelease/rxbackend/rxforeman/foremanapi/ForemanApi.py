import requests
from enum import Enum
from requests.auth import HTTPBasicAuth
import logging
import sys


logger = logging.getLogger(__name__)

logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class HostStatus(Enum):
 INSTALLATION_PENDING = 1
 INSTALLED = 2
 INSTALLATION_INITIAL_FAIL = 3
 INSTALLATION_FOREVER_FAIL = 4
 UNRESOLVED = 5

class Host:
 def __init__(self,host_id,settings):
  print("host created with ID"  + str(host_id))
  self.host_id = host_id
  self.settings = settings
  self.reboot_attempts = 0
 def powerOn(self):
      return requests.put(self.settings.foremanUrl + '/api/hosts/' + str(self.host_id) + '/power',json={'power_action':'start','id': str(self.host_id)},auth=HTTPBasicAuth(self.settings.username, self.settings.password),verify=False).text
 def powerOff(self):
  return requests.put(self.settings.foremanUrl + '/api/hosts/' + str(self.host_id) + '/power',json={'power_action':'stop','id': str(self.host_id)},auth=HTTPBasicAuth(self.settings.username, self.settings.password),verify=False).text
 def getStatus(self):

   result = HostStatus.UNRESOLVED
   response = requests.get(self.settings.foremanUrl + '/api/hosts/' + str(self.host_id),auth=HTTPBasicAuth(self.settings.username, self.settings.password),verify=False).json()

   buildstatuslabel = response['build_status_label']
   globalstatuslabel = response['global_status_label']

   if buildstatuslabel == 'Pending installation' and globalstatuslabel == 'Warning' and self.reboot_attempts < 3:
    result = HostStatus.INSTALLATION_INITIAL_FAIL
   elif buildstatuslabel == 'Installed' and globalstatuslabel == 'OK' and self.reboot_attempts < 3:
    result = HostStatus.INSTALLED
   elif buildstatuslabel == 'Installed' and globalstatuslabel == 'OK' and self.reboot_attempts >= 2:
    result = HostStatus.INSTALLATION_FOREVER_FAIL
   elif buildstatuslabel == 'Pending installation' and globalstatuslabel == 'OK' and self.reboot_attempts < 3:
    result =  HostStatus.INSTALLATION_PENDING
   return result

class ForemanApi:
 def __init__(self,settings):
  self.settings = settings
 def getFreeIp(self):
  return requests.get(self.settings.ForemanUrl + '/api/subnets/default/freeip',auth=HTTPBasicAuth(self.settings.username, self.settings.password),headers = {'Accept': 'application/json'},verify=False).json()
 def createHost(self):
  response = requests.post(self.settings.foremanUrl + '/api/hosts',json={'architecture_id': 1,'operatingsystem_id': 7,'domain_id': 1,'compute_profile_id': 1,'compute_resource_id': 1,'hostgroup_id': 5, 'build': 1 },
  auth=HTTPBasicAuth(self.settings.username, self.settings.password),headers = {'Accept': 'application/json'},
  verify=False).json()
  return Host(response['id'],self.settings)
  #self.powerOnHost(str(response['id']))
