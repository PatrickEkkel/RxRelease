import LogFactory from '../../logging/LogFactory'
import GlobalSettings from '../../config/global';


class PromiseExecutor  {

constructor() {
  this.settings = new GlobalSettings();
  this.logger = new LogFactory().createLogger("PROMISES","EXECUTOR")
  this.stored_state = {}
}

execute(promise,properties) {

  this.logger.debug("executing promise: " + promise)
  this.logger.traceObject(promise)
  this.logger.traceObject(properties)
  var context = this
  return function(response) {
    var result = null;

    context.logger.trace("stored_state before merge: ")
    context.logger.traceObject(context.stored_state)

    context.logger.trace("current properties: ")
    context.logger.traceObject(properties)
    context.stored_state = Object.assign(context.stored_state,properties)
    context.logger.trace("stored_state after merge: ")
    context.logger.traceObject(context.stored_state)

    result = promise(response,context.stored_state)
    context.logger.trace("promise result")
    context.logger.traceObject(result)
    return result;
  }
}

}

export default PromiseExecutor;
