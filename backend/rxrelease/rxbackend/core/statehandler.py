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
    def handlePythonState(self,state,host,handlerCommand,keyvalList):
        handlerPackage  = handlerCommand.replace('.py','')
        shell_command = "python3 -m " + self.rootdir + "." + handlerPackage + "." + handlerPackage + " " + str(host.id) + " " + str(host.ipaddress) +  " " +  str(state.id) +  " \"" + keyvalList + "\" >> /var/log/rxrelease/" + handlerCommand +  ".log 2>&1"
        logger.debug(shell_command)
        # run process as a background process
        shell_command = shell_command + ' &'

        logger.debug("statehandler context: " + self.rootdir)
        logger.debug("executing statehandler: " + shell_command)

        os.system(shell_command)
