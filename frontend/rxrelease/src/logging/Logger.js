
class Logger {

constructor(loglevel,component,subcomponent) {
  this.loglevel = loglevel;
  this.component = component;
  this.subcomponent = subcomponent;
}
// TODO: loglevel instelbaar maken over de gehele applicatie
write(loglevel,message) {
  console.log(loglevel + ": " + message)
}

debug(message) {
  this.write("DEBUG",message)
}
info(message) {
  this.write("INFO",message)
}
warning(message) {
  this.write("WARNING",message)
}
error(message) {
  this.write("ERROR",message)
}
}


export default Logger;
