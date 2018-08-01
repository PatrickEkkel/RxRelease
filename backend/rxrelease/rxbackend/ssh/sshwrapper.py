import logging,sys

from .shell import Shell
from .connectiondetails import ConnectionDetails


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)


class SSHWrapper:

    def __init__(self,connection_details):
        self.shell = Shell()
        self.connection_details = connection_details
    @classmethod
    def withPassword(self,address,username,password):
     connection_details = ConnectionDetails(username,password,address)
     return SSHWrapper(connection_details)
    def loginWithPassword(self,username,password):
     pass
    def loginWithKeys(self,username):
     self.connection_details = ConnectionDetails(username,'',self.address,True)
    def sendCommandWithOutput(self,command):
     pass
     # TODO: deze ook nog implementeren, want dit is belangrijk voor passwordless_sshlogin state
    def sendFile(self,sourcefile,destfile):
     return self.shell.scp_file(self.connection_details,sourcefile,destfile)
    def sendBlockingCommand(self,command):
      print("command sent to shell: " + command)
      return self.shell.run_remote_command(self.connection_details,command)
    def sendCommand(self, command):
      print("command sent to shell: " + command)
      return self.shell.run_remote_command(self.connection_details,command)
