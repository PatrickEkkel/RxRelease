import Axios from 'axios';
import LogFactory from '../logging/LogFactory'
import GlobalSettings from '../config/global'


var settings = new GlobalSettings();
var caLogger = new LogFactory().createLogger("COMMON","ACTIONCREATOR");


export function notAuthorized(status,error,dispatch) {
  if(status == 403) {
    caLogger.debug("Profile Retrieve failed, Resource Forbidden")
    caLogger.trace(error)
    dispatch(authenticationError())
  }
}

export function authenticationError() {
  return {
    type: 'AUTHENTICATION_ERROR'
  }
}
