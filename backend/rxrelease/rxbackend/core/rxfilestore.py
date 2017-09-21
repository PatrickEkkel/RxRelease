import os.path
from textfile import TextFile

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
  sh.cp(file,self.location + self.context)
  pass
 def openTextFile(self,file):
     result = TextFile(self.location + self.context + "/" + file)
     result.openOrCreate()
     result.close()
     return result

 def createDir(self,dir):
  newPath = self.location + self.context + dir
  if not os.path.exists(newPath):
   os.makedirs(newPath)
 def getFileStoreLocation(self):
  return self.location
