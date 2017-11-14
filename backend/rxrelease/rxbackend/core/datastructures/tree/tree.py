class Tree:

    def __init__(self):
        self.rootnode = None
    def setRoot(self,node):
        self.rootnode = node
    def findKey(self,key):
        return self.rootnode.findKey(key)
    def toList(self):
        result = self.getRoot().toList([])[::-1]
        return result
    def printTree(self):
        self.rootnode.printNode()
    def getRoot(self):
        return self.rootnode
