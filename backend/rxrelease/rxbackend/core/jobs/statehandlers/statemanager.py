import datetime
from rxbackend.core.restapi.REST_states import REST_states

class StateManager:

    def __init__(self,auth_token):
     self.auth_token = auth_token
     self.rest_states_api = REST_states(auth_token)

    def setRepeatableStateDone(self,state):
     repeatable_state = state['repeatable_state']
     print(repeatable_state)
     repeatable_state['last_successfull_run'] = datetime.datetime.now().isoformat()
     self.rest_states_api.putRepeatableState(state['repeatable_state'])

    def isComplexState(self, state):
        return state['complex_state'] is not None

    def isRepeatableState(self,state):
        return state['simple_state'] is not None

    def setSimpleStateInstalled(self,state):
     simple_state = state['simple_state']
     print(simple_state)
     simple_state['installed'] = True
     self.rest_states_api.putSimpleState(state['simple_state'])

    def setComplexStateStatus(self,state, status):
        complex_state = state['complex_state']
        print(complex_state)
        complex_state['status'] = status
        self.rest_states_api.putComplexState(state['complex_state'])
