from .connection import Connection

module_cli_api = None
connection = None
SALT_API_MODE = 'SALTTESTDOCKER'


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


def send_salt_ping(minion_id):
    settings_dict = {'dryrun': 'False', 'salt-command': '', 'salt-minion-id': minion_id, 'use-salt-api': 'True', 'salt-function': 'SALTPING'}
    salt_master = connection.module_cli_api.getHostByName('salt-master')
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    action = connection.action_factory.create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)


def enable_salt_dockertest():
    global SALT_API_MODE
    SALT_API_MODE = 'SALTTESTDOCKER'
    print('salt module switched too ', SALT_API_MODE)


def enable_salt_dryrun():
    global SALT_API_MODE
    SALT_API_MODE = 'SALTTESTDRYRUN'
    print('salt module switchedtoo ', SALT_API_MODE)


def send_salt_dockermock_command(minion_id, command):
    global SALT_API_MODE
    send_salt_command(minion_id, command, SALT_API_MODE)


def send_salt_dryrun_command(minion_id, command):
    global SALT_API_MODE
    send_salt_command(minion_id, command, SALT_API_MODE)

def apply_salt_state(state):
    global connection
    global SALT_API_MODE
    salt_master = connection.module_cli_api.getHostByName('salt-master')
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    settings_dict = {
        'dryrun': 'False'
        , 'salt-minion-id': 'None'
        , 'api-mode': SALT_API_MODE
        , 'salt-function': 'APPLYSTATE'
        , 'salt-formula': state
    }
    action = connection.action_factory\
            .create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)

def accept_minion(hostname):
    global connection
    global SALT_API_MODE
    salt_master = connection.module_cli_api.getHostByName(hostname)
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    settings_dict = {
        'dryrun': 'False'
        , 'salt-minion-id': 'None'
        , 'api-mode': SALT_API_MODE
        , 'salt-function': 'ACCEPTMINION'
    }
    action = connection.action_factory\
            .create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)

def accept_minions():
    global connection
    global SALT_API_MODE
    settings_dict = {
        'dryrun': 'False'
        , 'salt-minion-id': 'None'
        , 'api-mode': SALT_API_MODE
        , 'salt-function': 'ACCEPTMINIONS'
    }
    salt_master = connection.module_cli_api.getHostByName('salt-master')
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    action = connection.action_factory\
        .create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)


def list_all_accepted_salt_minions():
    global connection
    global SALT_API_MODE
    settings_dict = {
        'dryrun': 'False'
        , 'salt-minion-id': 'None'
        , 'api-mode': SALT_API_MODE
        , 'salt-function': 'LISTALLACCEPTEDMINIONS'
    }
    salt_master = connection.module_cli_api.getHostByName('salt-master')
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    action = connection.action_factory\
        .create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)


def send_salt_command(minion_id, command, salt_api_mode):
    # we need to get the saltmaster host object so we know where to send our commands
    global connection
    settings_dict = {
        'dryrun': 'False'
        , 'salt-command': command
        , 'salt-minion-id': minion_id
        , 'api-mode': salt_api_mode
        , 'salt-function': 'SALTCOMMAND'
    }
    salt_master = connection.module_cli_api.getHostByName('salt-master')
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    action = connection.action_factory\
        .create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)
