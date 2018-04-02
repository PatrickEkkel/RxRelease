#!/usr/bin/python3
#import importlib.util
import logging,sys
from backend.rxrelease.rxbackend.configuration.globalsettings import ApiUserSettings,NetworkSettings
from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication
from backend.rxrelease.rxbackend.core.cli.modulecli import ModuleCLI
auth_token = None
module_cli_api = None
try:
 token_result = REST_authentication().postCredentials(ApiUserSettings.username,ApiUserSettings.password)
 auth_token = token_result['token']
 module_cli_api = ModuleCLI(auth_token)
except:
 print('CLI connection with backend could not be established')
if auth_token is not None:
 print("CLI connection with backend successfull")


 # shortcut for the activating Salt

 def list_modules():
     print("Listing modules")
     for module in module_cli_api.listModules():
      print('name: ' + str(module['name']) + ' active: ' + str(module['active']))
 def enable_salt():
     print("Enabling salt module")
     module_cli_api.activateModule('rxsalt')
