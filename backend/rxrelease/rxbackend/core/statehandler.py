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
    def handlePythonState(self,state,handlerCommand,ipaddress,keyvalList):
        handlerPackage  = handlerCommand.replace('.py','')
        shell_command = "python3 -m " + self.rootdir + "." + handlerPackage + "." + handlerPackage + " " + ipaddress +  " " +  str(state.id) +  " " + keyvalList + " > /tmp/python_logging.txt"

        logger.debug("statehandler context: " + self.rootdir)
        logger.debug("executing statehandler: " + shell_command)
        os.system(shell_command)
