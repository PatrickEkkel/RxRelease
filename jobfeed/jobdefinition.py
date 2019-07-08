from backend.rxrelease.rxbackend.core.jobs.api.jobActionFactory import JobActionFactory
from backend.rxrelease.rxbackend.core.restapi.REST_statetypes import REST_statetypes
from backend.rxrelease.rxbackend.core.restapi.REST_states import REST_states
from backend.rxrelease.rxbackend.core.jobs.statetypes.handlerfactory import HandlerFactory

import logging, sys, time

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class TimedJobDefinition:

    def __init__(self, jobname):
        self.wrappedJobDefinition = DefaultJobDefinition(jobname)

    def getJobName(self):
        return self.wrappedJobDefinition.getJobName()

    def check_job_for_completion(self, state):
        return self.wrappedJobDefinition.check_job_for_completion(state)

    def pollJobCompleted(self, auth_token, statetypeRequest):
        return self.wrappedJobDefinition.pollJobCompleted(auth_token, statetypeRequest)

    def is_message_reciever(self, message):
        return self.wrappedJobDefinition.is_message_reciever(message)

    def process_message(self, action, session):
        return self.wrappedJobDefinition.process_message(action, session)


class DefaultJobDefinition:

    def __init__(self, jobname):
        self.jobName = jobname

    def getJobName(self):
        return self.jobName

    def check_job_for_completion(self, state):
        result = "STATE_NOT_INSTALLED"
        logger.debug(state)
        if self._is_simple_state(state):
            if self._is_simple_state_installed(state):
                print("task " + self.jobName + " succesfully installed")
                result = "SIMPLE_STATE_INSTALLED"
                logger.debug("task " + self.jobName + " succesfully installed")
        elif self._is_repeatable_state(state):
            result = 'REPEATABLE_STATE'
        elif self._is_complex_state(state):
            if self._is_complex_state_installed(state):
                print("task " + self.jobName + " succesfully installed")
                result = "COMPLEX_STATE_INSTALLED"
            elif self._is_complex_state_retryable(state):
                result = "COMPLEX_STATE_RETRY"
        else:
            logger.debug("state not recognized")
        return result

    def pollJobCompleted(self, auth_token, statetypeRequest):

        statesApi = REST_states(auth_token)
        result = 'STATE_NOT_EXECUTED'

        pollingState = True
        polling_frequenty = 5
        max_pollingtime = 4
        polling_counter = 0
        job_failed = False
        while pollingState:
            time.sleep(polling_frequenty)
            logger.info("checking task  " + self.jobName + " for completion")
            state = statesApi.getStateByHostAndStateTypeId(statetypeRequest.getHostId(),
                                                           statetypeRequest.getStateTypeId())
            logger.debug('state info: ' + str(state))
            job_state = self.check_job_for_completion(state[0])
            if job_state == 'SIMPLE_STATE_INSTALLED' or job_state == 'REPEATABLE_STATE':
                break
            elif job_state == 'COMPLEX_STATE_RETRY':
                logger.info("retryable job state detected, interrupt polling")
                result = 'RETRY_STATE'
                break
            if polling_counter == max_pollingtime:
                job_failed = True
                result = "STATE_FAILED"
                break
            polling_counter += 1
            # when job is failed, we need to setup a plan to recover from this failed state,
            # if job_failed:
        return result

    def process_message(self, action, session):
        session = session.get_session()
        logger.debug("Starting job: " + self.getJobName())
        logger.debug(
            "session: " + str(session.session_id) + " started at: " + str(session.session_start))
        statetypesApi = REST_statetypes(session.auth_token)
        payload = action.getPayload()
        statetypeRequest = HandlerFactory().createRequest(payload)

        statetypesApi.postHandleHostState(statetypeRequest)
        return self.pollJobCompleted(session.auth_token, statetypeRequest)

    def is_message_reciever(self, message):
        job_actionfactory = JobActionFactory(None)
        action = job_actionfactory.createActionFromString(message)

        # pretty nasty, TODO: deze tekens moeten eruit en zijn van een legacy voor ZMQ
        recieved_jobname = action.getJob().getName().strip('\'').strip('"')

        current_jobname = self.jobName
        if recieved_jobname == current_jobname:
            return True
        else:
            return False

    def _is_complex_state_installed(self,state):
        result = False
        if state['complex_state']['status'] == 'APPLIED':
            result = True
        return result

    def _is_simple_state_installed(self, state):
        result = False
        if state['simple_state']['installed']:
            result = True
        return result

    def _is_complex_state_retryable(self,state):
        result = False
        if state['complex_state']['status'] == 'APPLIED_BUT_FAILED_RETRYABLE':
            result = True
        return result

    def _is_complex_state(self, state):
        result = False
        if state['complex_state'] != None:
            logger.debug("COMPLEX_STATE detected")
            result = True
        return result

    def _is_repeatable_state(self, state):
        result = False
        if state['repeatable_state'] != None:
            logger.debug("REPEATABLE_STATE detected")
            result = True
        return result

    def _is_simple_state(self, state):
        result = False
        if state['simple_state'] != None:
            logger.debug("SIMPLE_STATE detected")
            result = True
        return result
