import sys,logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class Node(object):

    def __init__(self,key,value):
        self.children = []
        self.key = key
        self.value = value
    def setKey(self,key):
        self.key = key
    def setValue(self,value):
        self.value = value
    def getKey(self):
        return self.key
    def getValue(self):
        return self.value
    def toList(self,listref):
        for child in self.children:
            child.toList(listref)
        listref.append(tuple([self.key,self.value]))
        return listref
    def printNode(self):
        for child in self.children:
            child.printNode()
        print(self.key)
    def findKey(self,key):
        result = None
        # first check if we contain the value that is searched for
        logger.debug("search current node with key: " + str(self.key) + " ")
        if self.key == key:
            logger.debug("match found for key: " + str(key) + " at node with key: " + str(key))
            result = self
        else:
        # conduct bredth first search on the rest of tree
            for child in self.children:
             result = child.findKey(key)
             # if we have found something, break of the search and return the value
             if result is not None:
                 break

        return result

    def addChild(self,childNode):
        logger.debug("calling addChild, adding key: " + str(childNode.getKey())  + " as child from key: " + str(self.getKey()))
        self.children.append(childNode)
