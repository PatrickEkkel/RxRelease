import json
from ..ssh.shell import Shell

class ConsoleRunner:
    def __init__(self):
     pass
    def runStateHandlerJob(self,jobname,module,ipaddress,state_id,host_id,args):
        shell = Shell()
        if module == 'default':
         modulepath = '.'
        else:
         modulepath = '.' +  module + '.'
        json_array = json.dumps(args)
        shell_command = 'cd backend/rxrelease && python3 -m rxbackend' + modulepath + 'statehandlers' + '.' + jobname + '.' + jobname + ' ' + str(host_id) + ' ' + ipaddress + ' ' + str(state_id) +  ' ' + '\'' + json_array + '\''
        print(shell_command)
        shell.run_command(shell_command)
