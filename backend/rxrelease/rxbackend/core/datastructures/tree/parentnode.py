from .node import Node
class ParentNode(Node):

    def __init__(self,key,value,parentkey):
        super(ParentNode, self).__init__(key,value)
        self.parentKey = parentkey
    def setParentKey(self,parentKey):
        self.parentKey =  parentKey
    def getParentKey(self):
        return self.parentKey

    @classmethod
    def newParentNode(key,value,parentkey):
        result = ParentNode()
        result.setKey(key)
        result.setValue(value)
        result.setParentKey(parentkey)
        return result
