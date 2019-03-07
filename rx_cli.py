#!/usr/bin/python3
#import importlib.util
import logging,sys,os,importlib
import zmq
from backend.rxrelease.rxbackend.core.cli.actions import *
from backend.rxrelease.rxbackend.configuration.globalsettings import ApiUserSettings,NetworkSettings,RemoteSettings
from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication
from backend.rxrelease.rxbackend.core.jobs.zmq.scheduler_service import SchedulerService,ActionFactory
from backend.rxrelease.rxbackend.core.cli.modulecli import ModuleCLI
from backend.rxrelease.rxbackend.ssh.ssh import SSHClient
from backend.rxrelease.rxbackend.ssh.sshwrapper import SSHWrapper
from backend.rxrelease.rxbackend.ssh.shell import Shell
from backend.rxrelease.rxbackend.ssh.connectiondetails import ConnectionDetails
from backend.rxrelease.rxbackend.statehandlers.statehandler_console_runner import ConsoleRunner
from backend.rxrelease.rxbackend.rxsalt.statehandlers.statehandler_saltconsole_runner import SaltConsoleRunner

module_cli_api = None
api_user_settings_username = ApiUserSettings.username
api_user_settings_password = ApiUserSettings.password

shell = Shell()
runner = ConsoleRunner()
saltrunner = SaltConsoleRunner()
scheduler_service = SchedulerService()
action_factory = ActionFactory()

def createConnectionSettings(username,ipaddress,use_keys=False,password=''):
    return ConnectionDetails(username,password,ipaddress)

def load_settings_from_path(path):
 ApiUserSettings = importlib.import_module(path).ApiUserSettings
 global api_user_settings_username
 global api_user_settings_password

 api_user_settings_username = ApiUserSettings.username
 api_user_settings_password = ApiUserSettings.password
 print('settings changed')

def list_modules():
 print("Listing modules")
 for module in module_cli_api.listModules():
  print('name: ' + str(module['name']) + ' active: ' + str(module['active']))
def reset_saltwizard():
 module_cli_api.updateWizard('rxsalt_wizard','NEW')
 module_cli_api.deleteHost('Salt Master')

def init_salt_db():
        global module_cli_api
        if module_cli_api is None:
           module_cli_api = ModuleCLI(None)
        print("Running initial database package for basic usage")
        module_cli_api.initSaltDb()

def init_test_db():
 global module_cli_api
 if module_cli_api is None:
    module_cli_api = ModuleCLI(None)
 print("Running initial database package for basic usage")
 module_cli_api.initTestDb()

def init_rxrelease_db():
 global module_cli_api
 if module_cli_api is None:
     module_cli_api = ModuleCLI(None)
 print("Running initial database package for basic usage")
 module_cli_api.initDb()

def send_workload(host,statetype):
 env = module_cli_api.getEnvironment(host,statetype)
 action = action_factory.create_action_from_environment(env)
 scheduler_service.schedule_state(action)


# TODO: deze methode is niet geschrevn op de testset
def _send_test_workload():
 salt_api_env = module_cli_api.getEnvironment('salt-master','Salt-Api')
 ssh_passwordless_login_env = module_cli_api.getEnvironment('salt-master','SSH passwordless login')
 salt_master_env = module_cli_api.getEnvironment('salt-master','Salt-master')
 salt_minion_master_env = module_cli_api.getEnvironment('salt-master','Salt-minion-master')

 first_action = action_factory.create_action_from_environment(ssh_passwordless_login_env)
 second_action = action_factory.create_action_from_environment(salt_master_env)
 third_action = action_factory.create_action_from_environment(salt_minion_master_env)
 fourth_action = action_factory.create_action_from_environment(salt_api_env)
 scheduler_service.schedule_state(first_action)
 scheduler_service.schedule_state(second_action)
 scheduler_service.schedule_state(third_action)
 scheduler_service.schedule_state(fourth_action)


def auth_token():
    global api_user_settings_username
    global api_user_settings_password
    global module_cli_api
    return REST_authentication().postCredentials(api_user_settings_username,api_user_settings_password)['token']
def connect():
 auth_token = None

 global api_user_settings_username
 global api_user_settings_password
 global module_cli_api
 try:
  token_result = REST_authentication().postCredentials(api_user_settings_username,api_user_settings_password)
  auth_token = token_result['token']
  module_cli_api = ModuleCLI(auth_token)
 except:
  print('CLI connection with backend could not be established')
 if auth_token is not None:
  print("Legacy CLI connection with backend successfull")

  # shortcut for the activating Salt


def start_jobfeed():
  global api_user_settings_username
  global api_user_settings_password
  os.system('python3 jobfeedstart.py ' + api_user_settings_username + " " + api_user_settings_password)

def print_networksettings():
    print("ApiUserSettings username: " + api_user_settings_username)
    print("ApiUserSettings password: " + api_user_settings_password)

#connect()
