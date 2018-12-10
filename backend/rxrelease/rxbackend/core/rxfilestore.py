import os.path
import ntpath
from shutil import copyfile
from .textfile import TextFile

class RxFileStore:
 def __init__(self,location):
  self.location = location
  self.context = '/'
  if not os.path.exists(location):
     os.makedirs(location)
  pass
 def setContext(self,context):
  self.context = context
 def copyFile(self,file):
  copyfile(file,self.location + self.context + "/" + ntpath.basename(file))
  return self.location + self.context + "/" + ntpath.basename(file)
 def openTextFile(self,file):
     result = TextFile(self.location + self.context + "/" + file)
     result.openOrCreate()
     result.close()
     return result
 def newTextFile(self,file):
     result = TextFile(self.location + self.context + "/" + file)
     result.create()
     result.close()
     return result


 def createDir(self,dir):
  newPath = self.location + self.context + dir
  if not os.path.exists(newPath):
   os.makedirs(newPath)
 def getFileStoreLocationWithContext(self):
     return self.location + self.context + "/"
 def getFileStoreLocation(self):
  return self.location
