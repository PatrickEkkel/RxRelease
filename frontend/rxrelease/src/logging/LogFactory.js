import Logger from './Logger'
import GlobalSettings from '../config/global'

class LogFactory {

  constructor() {
  }
  createLogger(component,subcomponent) {
    return new Logger(GlobalSettings.getLogLevel(),component,subcomponent);
  }
}

export default LogFactory
