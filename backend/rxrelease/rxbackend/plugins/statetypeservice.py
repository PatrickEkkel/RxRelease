import logging, sys

from ..rxsalt.services.rxstatetype import RxStatetype

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class StateTypeService:

    def __init__(self):
        self.services = {}
        self._register_modules()
    def _register_modules(self):
        rx_statetype = RxStatetype()
        self.services[rx_statetype.get_module_name()] = rx_statetype

    def create_custom_statetype(self, statetype):
        service = self.services.get(statetype.module)
        if service:
            service.create_statetype_configuration(statetype)
        else:
            logger.debug(f"no service found for statetypemodule: {statetype.module}")
