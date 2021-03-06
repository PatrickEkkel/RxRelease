import logging, sys, os.path
from ..datastructures.tree.dependencytreemap import DependencyTreeMap
from ...models import State

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class DependencyResolverService:

    def __init__(self, capabilities, host_id):
        self.host_id = host_id
        self.capabilities = capabilities

    def _resolve_capability_states(self,capability, capability_states):
        states_map = []
        for state in capability_states:
            # get all the states that belong to this capability for
            logger.debug("found state: " + str(state))
            logger.debug("capability id: " + str(capability.id))
            states_map.append(state)
        return states_map

    def _resolve_capability_list(self, capabilityList):
        sorted_capability_statesmap = {}
        for kv in capabilityList:
            capability = kv[1]
            logger.debug("Current capability: " + str(capability))

            statetypes = capability.statetypes.all()
            # filter out repeatable states, they are not scheduled via the dependency tree
            capability_states = State.objects.filter(host_id=self.host_id).filter(statetype_id__in=statetypes, repeatable_state__isnull=True).all()
            sorted_capability_statesmap[capability.id] = []
            sorted_capability_statesmap[capability.id] = self._resolve_capability_states(capability, capability_states)
        return sorted_capability_statesmap


    def _resolve_capabilities(self):
        capability_treemap = DependencyTreeMap()
        for capability in self.capabilities:
            logger.debug('processing capability')
            logger.debug(capability.__dict__)
            parent = capability.dependentOn
            parent_id = None
            if parent == None:
                parent_id = -1
            else:
                parent_id = parent.id
            capability_treemap.addItem(capability.id, capability, parent_id)

        capability_treemap.merge()
        capabilityList = capability_treemap.toList()
        logger.debug("Amount of capabilities: " + str(len(capabilityList)))
        sorted_capability_statesmap = {}
        logger.debug(capabilityList)

        logger.debug("Amount of capabilities: " + str(len(capabilityList)))
        sorted_capability_statesmap = {}
        logger.debug(capabilityList)
        return self._resolve_capability_list(capabilityList)


    def _sort_states(self, statesmap):
        last_element = None
        sorted_states = []
        treemap = DependencyTreeMap()
        for state in statesmap:
            logger.info("state: " + str(state))
            parent = state.statetype.dependentOn
            parent_id = None
            if parent is None and last_element is None:
                parent_id = -1
            elif parent is None and last_element is not None:
                parent_id = last_element.statetype.dependentOn.id
            else:
                parent_id = parent.id
            treemap.addItem(state.statetype.id, state, parent_id)
            last_element = state

        treemap.merge()
        sorted_states = treemap.toList()
        return sorted_states

    def _resolve_states(self, sorted_capability_statesmap):
        treemap = DependencyTreeMap()
        logger.debug("found capabilities: " + str(len(sorted_capability_statesmap)))
        last_element = None
        statesList = []
        for key in sorted_capability_statesmap:
            logger.debug(
                "how many states are being found: " + str(len(sorted_capability_statesmap[key])))
            logger.debug("current capability: " + str(key))
            #if last_element:
            #    pass
            statesList += self._sort_states(sorted_capability_statesmap[key])
        return statesList


    def resolve(self):
        sorted_capability_statesmap = self._resolve_capabilities()
        sorted_states = self._resolve_states(sorted_capability_statesmap)

        logger.debug('sorted capabilities')
        logger.debug(sorted_capability_statesmap)
        logger.debug('sorted states')
        logger.debug(sorted_states)
        return sorted_states
