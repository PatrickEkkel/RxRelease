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
        # the capability which is the leaf of the tree
        for kv in capabilityList:
            capability = kv[1]
            logger.debug("Current capability: " + str(capability))

            statetypes = capability.statetypes.all()
            # filter out repeatable states, they are not scheduled via the dependency tree
            capability_states = State.objects.filter(self.host_id=host_id).filter(
                statetype_id__in=statetypes, repeatable_state__isnull=True).all()

            sorted_capability_statesmap[capability.id] = []
            for state in capability_states:
                # get all the states that belong to this capability for
                logger.debug("found state: " + str(state))
                logger.debug("capability id: " + str(capability.id))
                sorted_capability_statesmap[capability.id].append(state)

        return sorted_capability_statesmap

    def resolve(self):
        sorted_capability_statesmap = self._resolve_capabilities()
        logger.debug('sorted capabilities')
        logger.debug(sorted_capability_statesmap)
        return sorted_capability_statesmap
