import LogFactory from '../../logging/LogFactory'
import GlobalSettings from '../../config/global';


class PromiseExecutor  {

constructor() {
  this.settings = new GlobalSettings();
  this.logger = new LogFactory().createLogger("PROMISES","EXECUTOR")
  this.previous = null;
}

execute(promise,properties) {

  this.logger.debug("executing promise: " + promise)
  this.logger.traceObject(promise)
  this.logger.traceObject(properties)
  var context = this
  return function(response) {
    var result = null;
    result = promise(response,properties)
    context.previous = properties
    return result;
  }
}

}

export default PromiseExecutor;
