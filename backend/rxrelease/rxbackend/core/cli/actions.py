from .connection import Connection

module_cli_api = None
connection = None
#def _init():
 #global module_cli_api = ModuleCLI(auth_token)

def __init():
    global connection
    connection = Connection()
    connection.connect()
__init()



def help():
 print("list_modules() -> Lists modules that are available")
 print("enable_salt() -> enables salt module")
 print("reset_saltwizard() -> DEVELOPER, resets the state of the saltwizard, easy for testing")
 print("env = module_cli_api.getEnvironment(<hostname>,<statetype_name>) -> DEVELOPER, get an environment for a particular host,statetype combination, call runner.runStateHandlerJob(<statehandlername>,env)")
 print("example voor getEnvironment:  env = module_cli_api.getEnvironment('salt-master','Salt-Api')")
 print("execute statehandler without the scheduler, call runner.runStateHandlerJob('install-salt-api',env) ")
 print("init_rxrelease_db() -> fill the database with default objects, run only once because it does not drop things")


def connect():
    global connection
    connection = Connection()
    connection.connect()

def force_state(hostname,statetype_name,status):
    global connection
    connection.module_cli_api.setState(hostname,statetype_name,status)
    #print(host)

 # get the statetype object from the API
 # determine what kind of state this is
 # if determined validate the given state we want to enforce and if we can enforce it
 # if the state is valid, call the API en update the state information
