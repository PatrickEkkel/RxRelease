import logging,sys
from subprocess import call

from .connectiondetails import ConnectionDetails
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

class Shell:


    def run_remote_command(self, connection_details, remote_command):
        command = ''
        if not connection_details.use_default_keys and connection_details.key_location is None:
            command = ('sshpass -p '
            + connection_details.password
            + ' ssh -oStrictHostKeyChecking=no '
            + connection_details.username+ '@' + connection_details.ipaddress
            + ' -p '+ str(connection_details.port) + '  "' + remote_command + '"')
            print(command)
        elif not connection_details.use_default_keys and connection_details.key_location is not None:
            command = ('ssh -oStrictHostKeyChecking=no '
            + '-i '
            + connection_details.key_location
            + ' '
            + connection_details.username
            + '@'
            + connection_details.ipaddress
            + ' -p '
            + str(connection_details.port)
            + ' "'
            + remote_command + '"')
            print(command)
        elif connection_details.use_default_keys:
            logger.debug("using default keys")
            command = ('ssh -oStrictHostKeyChecking=no  '
            + connection_details.username
            + '@'
            + connection_details.ipaddress
            + ' -p '
            + str(connection_details.port)
            + ' "'
            + remote_command + '"')
            print(command)
        return self.run_command(command)

    def scp_file(self, connection_details, source, destination):
        if not connection_details.use_default_keys and connection_details.key_location is None:
            command =  ('sshpass -p '
            + connection_details.password
            +' scp -oStrictHostKeyChecking=no -P '
            + str(connection_details.port)
            + ' '
            + source + ' '
            + connection_details.username
            + '@'
            + connection_details.ipaddress
            + ':' + destination)
            print(command)
            return call(command,shell=True)

        elif not connection_details.use_default_keys and connection_details.key_location is not None:
            command =  ('scp -oStrictHostKeyChecking=no '
            + ' -i '
            + connection_details.key_location
            + ' -P'
            + str(connection_details.port)
            + ' '
            + source
            + ' '
            + connection_details.username
            + '@'
            + connection_details.ipaddress
            + ':' + destination)
            print(command)
            return call(command,shell=True)

        elif connection_details.use_default_keys:
            command =  ('scp -oStrictHostKeyChecking=no -P '
            + ' '
            + str(connection_details.port)
            + ' '
            + source
            + ' '
            + connection_details.username
            + '@'
            + connection_details.ipaddress
            + ':' + destination)
            print(command)
            return call(command,shell=True)


    def run_command(self, command):
        pass
        #call(["ls", "-l"])
        return call(command, shell=True)
        # TODO: haal de exitcode van het commando op doormiddel van $?
