import glob
from backend.rxrelease.rxbackend.core.cli.connection import Connection
from backend.rxrelease.rxbackend.core.cli.modulecli import ModuleCLI


c = Connection.get_connection()


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
    print("send_salt_command() -> N.A")


def connect():
    global connection
    connection = Connection()
    connection.connect()


def force_state(hostname, statetype_name, status):
    # get the statetype object from the API
    # determine what kind of state this is
    # if determined validate the given state we want to enforce and if we can enforce it
    # if the state is valid, call the API en update the state information
    global connection
    connection.module_cli_api.setState(hostname, statetype_name, status)


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

def init_test_db():
    module_cli_api = ModuleCLI(None)
    print("Running initial test database package for basic usage")
    module_cli_api.initTestDb()

def init_rxrelease_db():
    module_cli_api = ModuleCLI(None)
    print("Running initial database package for basic usage")
    module_cli_api.initDb()
