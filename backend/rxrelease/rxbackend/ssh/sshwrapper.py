import logging,sys

from .shell import Shell
from .connectiondetails import ConnectionDetails
from ..configuration.globalsettings import LocalSettings,RemoteSettings,ApiUserSettings


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

# TODO: remove the entire custom ssh implementation from the project and replace it with the fabric library
class SSHWrapper:

    def __init__(self, connection_details):
        self.shell = Shell()
        self.connection_details = connection_details


    @classmethod
    def with_connection_details(self, connection_details):
        return SSHWrapper(connection_details)


    @classmethod
    def with_password(self, address, username, password, port):
     connection_details = ConnectionDetails(username, password, address)
     # TODO: dit instelbaar maken op het host object
     connection_details.port = port
     return SSHWrapper(connection_details)

    @classmethod
    def with_keys(self,username,address,port):
     # TODO: dit instelbaar maken op het host object
     # TODO: same for the key, that is being used
     id_rsa = LocalSettings.localconfig + '/id_rsa'
     connection_details = ConnectionDetails.new_connection_with_custom_key(username,'',address,id_rsa, port)
     return SSHWrapper(connection_details)


    def send_command_with_output(self,command):
     pass

    def send_file(self,sourcefile,destfile):
     return self.shell.scp_file(self.connection_details, sourcefile, destfile)


    def send_blocking_command(self,command):
      print("command sent to shell: " + command)
      exit_code = self.shell.run_remote_command(self.connection_details, command)
      print("command exited with: " + str(exit_code))
      return exit_code


    def send_command(self, command):
      print("command sent to shell: " + command)
      return self.shell.run_remote_command(self.connection_details, command)
