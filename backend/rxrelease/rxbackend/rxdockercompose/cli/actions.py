import glob
from backend.rxrelease.rxbackend.core.cli.connection import Connection
from backend.rxrelease.rxbackend.core.cli.modulecli import ModuleCLI
from backend.rxrelease.rxbackend.configuration.globalsettings import RemoteSettings

def dockercompose_help():
    print("enable_dockercompose() -> enables docker_compose module")

def enable_dockercompose():
    print("Enabling dockercompose module")
    # uitbreiden met een lamba waarmee we erdoorheen kunnen zoeken
    # module_cli_api.listModules()
    connection = Connection.get_connection()
    connection.module_cli_api.activateModule('rxdockercompose')
