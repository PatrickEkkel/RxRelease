import ntpath
import os
import time
import logging, sys
from dateutil.parser import parse
from jobfeed.dispatcher import Dispatcher
from backend.rxrelease.rxbackend.core.jobs.zmq.messagebus import MessageBusBroker, MessageBusClient
from jobfeed.sessionmanager import SessionManager
from jobfeed.jobdefinition import DefaultJobDefinition, TimedJobDefinition
from backend.rxrelease.rxbackend.core.jobs.api.jobfactory import JobFactory
from backend.rxrelease.rxbackend.configuration.globalsettings import NetworkSettings, LocalSettings, \
    ApiUserSettings
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

actionFactory = JobActionFactory(None)
requestFactory = HandlerFactory()

api_user_settings_username = ApiUserSettings.username
api_user_settings_password = ApiUserSettings.password

if len(sys.argv) > 1:
    api_user_settings_username = sys.argv[1]
    api_user_settings_password = sys.argv[2]

localuser = LocalSettings.localuser

sessionmanager = SessionManager(api_user_settings_username, api_user_settings_password)
sessionmanager.login()

dispatcher = Dispatcher(sessionmanager)
mbb = MessageBusBroker()
# TODO: these job definitions should not be defined here,
#  but in a more central place, for example in the database,
#  therefore we should aim at making a few API calls that support this idea
dispatcher.register_job(DefaultJobDefinition("StateHandlerJob"))
dispatcher.register_job(DefaultJobDefinition("SaltHandlerJob"))
dispatcher.register_job(TimedJobDefinition('TimedStateHandlerJob'))
dispatcher.run()
