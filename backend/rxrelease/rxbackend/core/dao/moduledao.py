import logging,sys
from ...models import Module

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class ModuleDao:
    def getModuleByName(self,name):
        return Module.objects.get(name=name)
    def updateModule(self,module):
        module.save()
        pass
