import logging,sys
from subprocess import call

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

from .connectiondetails import ConnectionDetails
class Shell:
    def run_remote_command(self,connection_details,remote_command):
     command = ''
     if not connection_details.use_keys:
      command = 'sshpass -p ' + connection_details.password + ' ssh ' + connection_details.username + '@' + connection_details.ipaddress + '-p ' + connection_details.port + '"' + remote_command + '"'
      print(command)
     else:
      command = 'ssh ' + connection_details.username + '@' + connection_details.ipaddress + '-p ' + connection_details.port  + ' "' + remote_command + '"'
      print(command)
     #return 1
     return self.run_command(command)

    def scp_file(self,connection_details,source,destination):
     if not connection_details.use_keys:
      command =  'sshpass -p ' + connection_details.password + ' scp -P ' + str(connection_details.port) + ' ' + source + ' ' + connection_details.username + '@' + connection_details.ipaddress + ':' + destination
      print(command)
      return call(command,shell=True)
     else:
      command =  'scp -P ' + str(connection_details.port) + ' ' + source + ' ' + connection_details.username + '@' + connection_details.ipaddress + ':' + destination
      print(command)
      return call(command,shell=True)
    def run_command(self,command):
     #call(["ls", "-l"])
     return call(command,shell=True)
     # TODO: haal de exitcode van het commando op doormiddel van $?
