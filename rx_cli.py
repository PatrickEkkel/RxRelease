#!/usr/bin/python3
#import importlib.util
import logging,sys,os,importlib
from backend.rxrelease.rxbackend.configuration.globalsettings import ApiUserSettings,NetworkSettings
from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication
from backend.rxrelease.rxbackend.core.cli.modulecli import ModuleCLI
from backend.rxrelease.rxbackend.ssh.ssh import SSHClient
from backend.rxrelease.rxbackend.ssh.sshwrapper import SSHWrapper
from backend.rxrelease.rxbackend.ssh.shell import Shell
from backend.rxrelease.rxbackend.ssh.connectiondetails import ConnectionDetails
from backend.rxrelease.rxbackend.statehandlers.statehandler_console_runner import ConsoleRunner

module_cli_api = None
api_user_settings_username = ApiUserSettings.username
api_user_settings_password = ApiUserSettings.password

shell = Shell()
runner = ConsoleRunner()

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
def enable_salt():
 print("Enabling salt module")
 # uitbreiden met een lamba waarmee we erdoorheen kunnen zoeken
 #module_cli_api.listModules()
 module_cli_api.activateModule('rxsalt')
 module_cli_api.createWizard('rxsalt_wizard','NEW')


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
  print("CLI connection with backend successfull")

  # shortcut for the activating Salt


def start_jobfeed():
  global api_user_settings_username
  global api_user_settings_password
  os.system('python3 jobfeedstart.py ' + api_user_settings_username + " " + api_user_settings_password)

def print_networksettings():
    print("ApiUserSettings username: " + api_user_settings_username)
    print("ApiUserSettings password: " + api_user_settings_password)

connect()
