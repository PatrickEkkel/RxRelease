import logging, sys, pyinotify
from threading import Thread
from time import sleep
from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory
from backend.rxrelease.rxbackend.core.jobs.zmq.scheduler_server import SchedulerServer

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
actionFactory = JobActionFactory(None)
requestFactory = HandlerFactory()


class Dispatcher:
    def __init__(self, session):
        self.scheduler_server = SchedulerServer(session)

    def register_job(self, job):
        self.scheduler_server.register_messagehandler(job)

    def run(self):
        self.scheduler_server.start()
