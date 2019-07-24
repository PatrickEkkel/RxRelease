import logging,sys,os.path

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class KeyValListBuilder:

    def __init__(self):
        self.items = []
    def addKeyValPair(self,key,value):
        self.items.append({key : value})
    def build(self):
        result = ""
        for item in self.items:
         for key,value in item.items():
          result += key + ":" + value + ","

        result = result[:-1]
        return result
