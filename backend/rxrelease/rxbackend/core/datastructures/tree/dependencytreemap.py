import logging,sys
from .tree import Tree
from .node import Node
from .parentnode import ParentNode

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class DependencyTreeMap:

    def __init__(self):
        self.treeList = []
    def printTree(self):
        for tree in self.treeList:
          print("printing new treelist")
          tree.printTree()

    def merge(self):
        trees_to_remove = []
        for tree_x in self.treeList:
            for tree_y in self.treeList:
                # don't merge ourselves, that is no what we want
             if tree_x is not tree_y:
                 parent_key = tree_x.getRoot().getParentKey()
                 result =  tree_y.findKey(parent_key)
                 if result is not None:
                     # we found the tree which we belong to namelijky tree_y, so we want to add ourselves to this tree
                     result.addChild(tree_x.getRoot())
                     trees_to_remove.append(tree_x)

                     # after adding stop searching and return to tree_x loop
                     break
            for tree in trees_to_remove:
                self.treeList.remove(tree)

    def addItem(self,key,value,parentkey):

        if len(self.treeList) == 0:
            newTree = Tree()
            newTree.setRoot(ParentNode(key,value,parentkey))
            self.treeList.append(newTree)
        else:
            result = None
            # search trough trees and add the element to the correct tree
            for tree in self.treeList:
                # find the parentkey in the treemap
                result = tree.findKey(parentkey)
                if result is not None:
                    logger.debug("match found, stop searching")
                    break

            if result is None:
                logger.debug("parent key: " + str(parentkey) + " NOT found in available trees, creating an new tree")
                # key not found, parent is not yet added to available trees
                # add a new tree
                newTree = Tree()
                logger.debug("adding key: " + str(key) +  " to new tree")
                newTree.setRoot(ParentNode(key,value,parentkey))
                self.treeList.append(newTree)
            else:
                logger.debug("parent key: " + str(parentkey) + " FOUND, adding key: " + str(key) + " as child")
                # if parent is found add the node to the parent
                result.addChild(Node(key,value))
