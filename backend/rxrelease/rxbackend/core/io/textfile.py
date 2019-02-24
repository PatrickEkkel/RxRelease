import logging,sys,os.path,ntpath

class TextFile:

    def __init__(self,location):
        self.location = location
        
    def openReadOnly(self):
        if os.path.exists(self.location):
            self.filehandle = open(self.location,'r')

    def create(self):
        self.filehandle = open(self.location,'w+')

    def openOrCreate(self):
        if os.path.exists(self.location):
         self.filehandle = open(self.location,'a+')
        else:
         self.filehandle = open(self.location,'w+')

    def getFilename(self):
        return ntpath.basename(self.location)

    def close(self):
        self.filehandle.close()

    def getLines(self):
        self.openReadOnly()
        lines = self.filehandle.readlines()
        return lines

    def write(self,line):
        self.openOrCreate()
        self.filehandle.write(line)
        self.close()

    def get_location(self):
        return self.location

    def writeLine(self,line):
        self.openOrCreate()
        self.filehandle.write(line + '\n')
        self.close()
