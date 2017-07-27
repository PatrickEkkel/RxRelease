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

    def __init__(self, address, username):
        #logger.info("Connecting to server on ip", str(address) + ".")
        self.client = paramiko.client.SSHClient()
        self.client.set_missing_host_key_policy(paramiko.client.AutoAddPolicy())
        self.client.connect(address, username=username, password=None, look_for_keys=True)
        #self.transport = paramiko.Transport((address, 22))
        #self.client.connect(username=username, password=None)

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
        while not stdout.channel.exit_status_ready():
            if stdout.channel.recv_ready():
                rl, wl, xl = select.select([ stdout.channel ], [ ], [ ], 0.0)
                if len(rl) > 0:
                    tmp = stdout.channel.recv(1024)
                    output = tmp.decode()
                    print output
