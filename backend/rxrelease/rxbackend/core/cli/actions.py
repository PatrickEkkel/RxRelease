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
 print("force_state(hostname,statetype_name,status) -> can be used to force a state, can be usefull for testing or recovering from a borked state")
 print("init_test_db() -> fills the database with mock statetypes that can be used to test functionality without having a VM ")


def connect():
    global connection
    connection = Connection()
    connection.connect()

def force_state(hostname,statetype_name,status):
    # get the statetype object from the API
    # determine what kind of state this is
    # if determined validate the given state we want to enforce and if we can enforce it
    # if the state is valid, call the API en update the state information
    global connection
    connection.module_cli_api.setState(hostname,statetype_name,status)
    #print(host)

def send_test_workload_2(hostname):
 global connection
 test_state_2 = module_cli_api.getEnvironment(hostname, 'test-state1')
 first_action = connection.action_factory.create_action_from_environment(test_state_2)
 connection.scheduler_service.schedule_state(first_action)

def send_test_workload_1(hostname):
 global connection
 test_state_1 = connection.module_cli_api.getEnvironment(hostname, 'test-state1')
 first_action = connection.action_factory.create_action_from_environment(test_state_1)
 connection.scheduler_service.schedule_state(first_action)

def send_salt_command():
 # we need to get the saltmaster host object so we know where to send our commands
 global connection
 settings_dict = {'dryrun': 'False'}
 settings_dict['salt-command'] = 'ls -al'

 salt_master = connection.module_cli_api.getHostByName('salt-master')
 statetype = connection.module_cli_api.getStatetypeByName('test-saltstate1')
 action =  connection.action_factory.create_action_from_host(salt_master,settings_dict,statetype)
 connection.scheduler_service.schedule_state(action)
