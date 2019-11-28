import Axios from 'axios';
import GlobalSettings from '../config/global'
import LogFactory from '../logging/LogFactory'

var settings = new GlobalSettings();
var haLogger = new LogFactory().createLogger("STATETYPES","ACTIONCREATOR")


export function openNewStateType(hostentry) {

  return {
    type: 'OPEN_NEW_STATETYPE'
    }
}
