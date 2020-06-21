import logging, sys
from ...models import KVSetting
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class RxStatetype:

    def __init__(self):
        pass

    def get_module_name(self):
        return 'rxsalt'

    def create_statetype_configuration(self, statetype):

        logger.debug('creating configuration for rxsalt statetype')
        KVSetting.objects.create(key='test', value='False',
         category=statetype.state_settings)
        KVSetting.objects.create(key='api-mode', value='PRODUCTION',
         category=statetype.state_settings)
         # this means that custom statetypes can only be of the type 'APPLYSTATE'
         # for now this is okay, in the near future this may be not enough
        KVSetting.objects.create(key='salt-function', value='APPLYSTATE',
         category=statetype.state_settings)
        KVSetting.objects.create(key='salt-minion-id', value='{CCHOSTNAME}',
         category=statetype.state_settings)
        KVSetting.objects.create(key='api-mode', value='PRODUCTION',
         category=statetype.state_settings)
