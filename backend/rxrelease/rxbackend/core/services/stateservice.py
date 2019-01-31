import logging,sys
from django.db import transaction
from ...models import State
from ...models import SimpleState
from ...models import RepeatableState

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class StateService:

    def __init__(self):
     pass
    # NOTE: hier waren we gebleven, we moeten een repeatable_state aan de filler toevoegen en een nieuwe host maken via de interface
    @transaction.atomic
    def create_state(self,statetype,host):
        result = None
        if statetype.jobtype == "SIMPLE_STATE":
             logger.debug("Constructing SIMPLE_STATE Object")
             result = SimpleState.objects.create(installed=False)
             State.objects.create(statetype=statetype, host=host, name=statetype.name,
                                  simple_state=result)

        elif statetype.jobtype == "REPEATABLE_STATE":
            logger.debug("Constructing REPEATABLE_STATE Object")
            result = RepeatableState.objects.create()
            State.objects.create(statetype=statetype, host=host, name=statetype.name,
                                 repeatable_state=result)
        return result
