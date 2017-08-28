import sh,os.path

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
 def createDir(self,dir):
  sh.mkdir("-p",self.location + self.context + dir) 
 def getFileStoreLocation(self):
  return self.location