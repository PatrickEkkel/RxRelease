#!/usr/bin/python3
import requests
import logging
import inspect
from bs4 import BeautifulSoup
from enum import Enum



#try:
#    import http.client as http_client
#except ImportError:
    # Python 2
#    import httplib as http_client
#http_client.HTTPConnection.debuglevel = 1



from requests.auth import HTTPBasicAuth



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
  return requests.put(self.settings.getUrl() + '/api/hosts/' + str(self.host_id) + '/power',json={'power_action':'start','id': str(self.host_id)},auth=HTTPBasicAuth(self.settings.getUsername(), self.settings.getPassword()),verify=False).text 
 def powerOff(self):
  return requests.put(self.settings.getUrl() + '/api/hosts/' + str(self.host_id) + '/power',json={'power_action':'stop','id': str(self.host_id)},auth=HTTPBasicAuth(self.settings.getUsername(), self.settings.getPassword()),verify=False).text 
 def getStatus(self):
   
   result = HostStatus.UNRESOLVED
   response = requests.get(self.settings.getUrl() + '/api/hosts/' + str(self.host_id),auth=HTTPBasicAuth(self.settings.getUsername(), self.settings.getPassword()),verify=False).json()
   
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
    
 
class ForemanSettings:
 def __init__(self):
  self.foreman_url = "https://foreman.topicusoverheid.local"
  self.foreman_user = "admin"
  self.foreman_passwd = "ktfewHRZCx4MomrV"
 def getUrl(self):
  return self.foreman_url
 def getPassword(self):
  return self.foreman_passwd
 def getUsername(self):
  return self.foreman_user   

class ForemanApi:
 def __init__(self,settings):
  self.settings = settings
 def getcsrftoken(self,html):
  soup = BeautifulSoup(html,"lxml")
  csrftoken = ""
  for d in soup.findAll("meta",{"name":"csrf-token"}):
    csrftoken = d["content"]
  return csrftoken  
 def getFreeIp(self):
  return requests.get(self.settings.getUrl() + '/api/subnets/default/freeip',auth=HTTPBasicAuth(self.settings.getUsername(), self.settings.getPasword()),headers = {'Accept': 'application/json'},verify=False).json()
 def createHost(self):
  response = requests.post(self.settings.getUrl() + '/api/hosts',json={'architecture_id': 1,'operatingsystem_id': 7,'domain_id': 1,'compute_profile_id': 1,'compute_resource_id': 1,'hostgroup_id': 5, 'build': 1 },
  auth=HTTPBasicAuth(self.settings.getUsername(), self.settings.getPassword()),headers = {'Accept': 'application/json'},
  verify=False).json()
  return Host(response['id'],self.settings)
  #self.powerOnHost(str(response['id']))


class ForemanManager: 
 
 def __init_(self):
  pass
 
 def createNewVM(self):
  pass  
 
settings = ForemanSettings()
fm = ForemanApi(settings)

existingHost81 = Host(81,settings)
status =  existingHost81.getStatus()
print(status)
#existingHost81.powerOff()

existingHost83 = Host(83,settings)
status = existingHost83.getStatus()
print(status)

#newHost = fm.createHost()
#newHost.powerOn()



