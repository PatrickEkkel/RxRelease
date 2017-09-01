import logging,sys,os

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class StateHandler:
    pass
    def __init__(self,rootdir):
        self.rootdir = rootdir
        pass
    def handlePythonState(self,handlerCommand,ipaddress,keyvalList):
        shell_command_logging = "python " + handlerCommand + " " + ipaddress + " " + keyvalList + " > /tmp/python_logging.txt"
        logger.debug("statehandler context: " + self.rootdir)
        logger.info("executing statehandler: " + shell_command_logging)
        print(self.rootdir + handlerCommand)
        shell_command = "python " + self.rootdir  +  handlerCommand + " " + ipaddress + " " + keyvalList + " > /tmp/python_logging.txt"
        os.system(shell_command)
