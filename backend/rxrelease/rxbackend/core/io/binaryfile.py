import logging,sys,os.path,ntpath

class BinaryFile:
    def __init__(self,location):
        self.location = location

    def create(self):
        self.filehandle = open(self.location,'wb+')
    def open_or_create(self):
        if os.path.exists(self.location):
         self.filehandle = open(self.location,'ab+')
        else:
         self.filehandle = open(self.location,'wb+')
    def get_filename(self):
        return ntpath.basename(self.location)
    def close(self):
        self.filehandle.close()
    def write(self,line):
        self.open_or_create()
        self.filehandle.write(line)
        self.close()
