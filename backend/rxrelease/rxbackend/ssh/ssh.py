import paramiko
import logging
import sys
import threading

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class SSHClient:
    shell = None
    client = None
    transport = None
    @classmethod
    def withPassword(self,address,username,password):
       client = SSHClient(address)
       client.loginWithPassword(username,password)
       return client
       
    def __init__(self,address):
        self.address = address
	
    def loginWithPassword(self,username,password):
       self.client = paramiko.client.SSHClient()
       self.client.set_missing_host_key_policy(paramiko.client.AutoAddPolicy())
       self.client.connect(self.address, username=username, password=password, look_for_keys=False,allow_agent=False)

    def loginWithKeys(self,username):
        self.client = paramiko.client.SSHClient()
        self.client.set_missing_host_key_policy(paramiko.client.AutoAddPolicy())
        self.client.connect(address, username=username, password=None, look_for_keys=True)
        
    def sendFile(self,sourcefile,destfile):
        sftp  = self.client.open_sftp()
        sftp.put(sourcefile,destfile)
    def close(self):
        if(self.client != None):
            self.client.close()
            #self.transport.close()

    #def openShell(self):
    #    self.shell = self.client.invoke_shell()

    def sendCommand(self, command):
        logger.info("command sent to shell: " + command)
        stdin, stdout,stderr = self.client.exec_command(command)
        exitcode = stdout.channel.recv_exit_status()
        return exitcode
