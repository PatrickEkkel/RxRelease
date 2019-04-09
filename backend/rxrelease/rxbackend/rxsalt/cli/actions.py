import glob
from backend.rxrelease.rxbackend.core.cli.connection import Connection
from backend.rxrelease.rxbackend.core.cli.modulecli import ModuleCLI

SALT_API_MODE = 'SALTTESTDOCKER'


def init_salt_db():
        module_cli_api = ModuleCLI(None)
        print("Running initial salt database package for basic usage")
        module_cli_api.initSaltDb()


def salt_help():
    print("enable_salt() -> enables salt module")
    print("reset_saltwizard() -> DEVELOPER, resets the state of the saltwizard, easy for testing")
    print("send_salt_command() -> N.A")
    print('init_salt_db() -> initializes the salt portion of the database ')

def send_salt_ping(minion_id):
    settings_dict = {'dryrun': 'False', 'salt-command': '', 'salt-minion-id': minion_id, 'use-salt-api': 'True', 'salt-function': 'SALTPING'}
    salt_master = connection.module_cli_api.getHostByName('salt-master')
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    action = connection.action_factory.create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)


def reset_saltwizard():
    connection.module_cli_api.update_wizard('rxsalt_wizard','NEW')
    connection.module_cli_api.delete_host('Salt Master')


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
    global SALT_API_MODE
    connection = Connection.get_connection()
    salt_master = 'salt-master'
    sshport = connection.module_cli_api.get_setting_from_host(salt_master, 'sshport')[0]['value']
    saltapiport = connection.module_cli_api.get_setting_from_host(salt_master, 'saltapiport')[0]['value']

    salt_master = connection.module_cli_api.getHostByName(salt_master)
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    settings_dict = {
        'dryrun': 'False'
        , 'salt-minion-id': 'None'
        , 'api-mode': SALT_API_MODE
        , 'salt-function': 'APPLYSTATE'
        , 'salt-formula': state
        , 'sshport': sshport
        , 'saltapiport': saltapiport
    }
    action = connection.action_factory\
        .create_action_from_host(salt_master, settings_dict, statetype)
    connection.scheduler_service.schedule_state(action)


def accept_minion(hostname):
    global SALT_API_MODE

    connection = Connection.get_connection()
    sshport = connection.module_cli_api.get_setting_from_host(hostname, 'sshport')[0]['value']
    saltapiport = connection.module_cli_api.get_setting_from_host(hostname, 'saltapiport')[0]['value']
    print('connection to: ' + hostname + ' at port: ' + sshport)
    salt_master = connection.module_cli_api.getHostByName(hostname)
    statetype = connection.module_cli_api.getStatetypeByName('Salt-Run-State')
    settings_dict = {
        'dryrun': 'False'
        , 'salt-minion-id': 'None'
        , 'api-mode': SALT_API_MODE
        , 'salt-function': 'ACCEPTMINION'
        , 'sshport': sshport
        , 'saltapiport': saltapiport
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


def sync_salt_formula(salt_formula):
    connection = Connection.get_connection()
    global SALT_API_MODE
    hostname = 'salt-master'
    sshport = connection.module_cli_api.get_setting_from_host(hostname, 'sshport')[0]['value']
    saltapiport = connection.module_cli_api.get_setting_from_host(hostname, 'saltapiport')[0]['value']

    settings_dict = {
        'dryrun': 'False'
        , 'salt-command': ''
        , 'salt-minion-id': ''
        , 'api-mode': SALT_API_MODE
        , 'salt-formula': salt_formula
        , 'salt-function': 'SYNCFORMULA'
        , 'sshport': sshport
        , 'saltapiport': saltapiport
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


def create_salt_formula(name,salt_state_path):
    global connection

    files = glob.glob(salt_state_path)
    file_refs = []
    for file in files:
        result = connection.module_cli_api.upload_file(file)
        print(result)
        file_refs.append(result)
    formula = {'name': name, 'status': 'NEW', 'files': file_refs}
    connection.module_cli_api.create_salt_formula(formula)
    # do a call to the backend to create a formula
    # upload all the files associated with the formula


def enable_salt():
    print("Enabling salt module")
    # uitbreiden met een lamba waarmee we erdoorheen kunnen zoeken
    # module_cli_api.listModules()
    connection = Connection.get_connection()
    connection.module_cli_api.activateModule('rxsalt')
    connection.module_cli_api.createWizard('rxsalt_wizard', 'NEW')
