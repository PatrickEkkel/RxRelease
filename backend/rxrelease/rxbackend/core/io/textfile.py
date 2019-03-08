import logging,sys,os.path,ntpath

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class TextFile:

    def __init__(self,location):
        self.location = location

    def openReadOnly(self):
        logger.debug('open file in read only mode: ' + self.location)
        if os.path.exists(self.location):
            logger.debug('opening file for reading: ' + self.location)
            self.filehandle = open(self.location,'r')
            self.filehandle.seek(0)

    def overwriteOrCreate(self):
        self.filehandle = open(self.location,'w')

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

    def getContent(self):
        self.openReadOnly()
        return self.filehandle.read()

    def getLines(self):
        self.openReadOnly()
        lines = self.filehandle.readlines()
        return lines

    def write(self,line,overwrite=False):
        if not overwrite:
            logger.debug('writing file in append mode')
            self.openOrCreate()
            self.filehandle.write(line)
        else:
            logger.debug('writing file in overwrite mode')
            self.overwriteOrCreate()
            self.filehandle.write(line)
        self.close()

    def get_location(self):
        return self.location

    def writeLine(self,line,overwrite=False):
        if not overwrite:
            self.openOrCreate()
        else:
            self.overwriteOrCreate()
        self.filehandle.write(line + '\n')
        self.close()
