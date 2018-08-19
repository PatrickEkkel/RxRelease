import json
from ...statehandlers.statehandler_console_runner import ConsoleRunner

class SaltConsoleRunner:
    def __init__(self):
     pass
    def runStateHandlerSaltJob(self,env,command):
        jobname = 'salt-command-module'
        console_runner = ConsoleRunner()
        env.append_to_dict('command',command)
        console_runner.runStateHandlerJob(jobname,env)
