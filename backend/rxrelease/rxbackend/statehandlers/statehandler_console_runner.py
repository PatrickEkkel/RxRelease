import json
from ..ssh.shell import Shell

class ConsoleRunner:
    def __init__(self):
     pass
    def runStateHandlerJob(self,jobname,env):
        shell = Shell()
        host_id = env.host[0]['id']
        ipaddress = env.host[0]['ipaddress']
        # TODO: query bouwen die de state bij de stateype ophaalt via host_id, niet belangrijk voor nu
        state_id = 0
        if env.module == 'default':
         modulepath = '.'
        else:
         modulepath = '.' +  env.module + '.'
        json_array = json.dumps(env.settings_dict)
        shell_command = 'cd backend/rxrelease && python3 -m rxbackend' + modulepath + 'statehandlers' + '.' + jobname + '.' + jobname + ' ' + str(host_id) + ' ' + ipaddress + ' ' + str(state_id) +  ' ' + '\'' + json_array + '\''
        print(shell_command)
        shell.run_command(shell_command)
