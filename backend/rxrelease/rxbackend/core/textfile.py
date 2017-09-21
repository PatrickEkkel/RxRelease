import logging,sys,os.path

class TextFile:
    def __init__(self,location):
        self.location = location
    def openOrCreate(self):
        if os.path.exists(self.location):
         self.filehandle = open(self.location,'a')
        else:
         self.filehandle = open(self.location,'w+')
    def close(self):
        self.filehandle.close()
    def writeLine(self,line):
        self.openOrCreate()


        self.filehandle.write(line + '\n')
        self.close()
