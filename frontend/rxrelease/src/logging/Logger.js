import GlobalSettings from '../config/global'

class Logger {

constructor(loglevel,component,subcomponent) {
  this.loglevel = loglevel;
  this.component = component;
  this.subcomponent = subcomponent;
  this.logHierarchy = { INFO:0,WARNING:1,ERROR:2,DEBUG:3,TRACE:4}
}
// TODO: loglevel instelbaar maken over de gehele applicatie
write(loglevel,message,mode) {
  // logging hierarchy
  // INFO,WARNING,ERROR(log always) and DEBUG
  // logging hierarchy in een dictionary stoppen zodat we het makkelijk kunnen matchen
    /*
       Errors can't be turned off (unless you turned logging completely off)
    */
    var logmodules =  GlobalSettings.getLogModules();

    if(logmodules != "NONE") {

      var showLog = true;
      // if logmodules has LIST as value, than check the the enabledLogging List if we need to print this logging
      if(logmodules == "LIST") {

        showLog = this.checkEnabledLoggingParameters();
      }

      if(loglevel == "ERROR") {
        this.writeToConsole(loglevel + ": " + message);
      }
      // if it is not error we should look at the logHierarchy index
      else {
        if(showLog) {
          var allowedLogIndex = this.logHierarchy[this.loglevel];
          // is the loglevel suffecient to print the message
          if(this.logHierarchy[loglevel] <= allowedLogIndex) {
              switch (mode) {
                case "OBJECT":
                  this.writeToRawConsole(message);
                  break;
                case "STRING":
                  this.writeToConsole(loglevel + ": " + message);
                  break;
              }


            }
          }
        }
    }
  }
checkEnabledLoggingParameters() {
 var result = false;
 var enabledList =  GlobalSettings.getEnabledLogging()

 // concat component and subcomponent so we can do a straight up equals of the String
 // Fully qualified component name ;-)
 var fqcn = this.component + "." + this.subcomponent;
 // only support subcomponent willcards
 var wilcardname = this.component + ".*";

 // first search for the fqcn
 for(var i=0;i<enabledList.length;i++) {
   if(fqcn == enabledList[i]) {
     result = true;
     break;
   }
   // do a wilcardmatch on the name straight up stringcompare
   if(wilcardname == enabledList[i]) {
     result = true;
     break;
   }
   // TODO: wildcards werkt nog niet goed
   // start matching the first part of the component
   /*var componentDescription = enabledList[i].split('.')[0];
   if(componentDescription == this.component) {
     result = true;
     break;
   }*/
 }

return result;
}
writeToConsole(message) {
  console.log("%c " + message,'background: white; color: red; display: block;')
}
writeToRawConsole(message) {
  console.log(message)
}
traceObject(object) {
  this.write("TRACE",object,"OBJECT")
}
trace(message) {
  this.write("TRACE",message,"STRING")
}
debug(message) {
  this.write("DEBUG",message,"STRING")
}
info(message) {
  this.write("INFO",message,"STRING")
}
warning(message) {
  this.write("WARNING",message,"STRING")
}
error(message) {
  this.write("ERROR",message,"STRING")
}
}


export default Logger;
