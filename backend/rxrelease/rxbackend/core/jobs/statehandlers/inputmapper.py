import sys
from .statehandlerinput import StateHandlerInput

class InputMapper:

    def __init__(self):
     pass
    def getInputFromCLI(self):
     ipaddress = sys.argv[2]
     state_id = sys.argv[3]
     host_id = sys.argv[1]
     keyvallist = sys.argv[4]
     result = StateHandlerInput(host_id,state_id,ipaddress,keyvallist)
     return result
