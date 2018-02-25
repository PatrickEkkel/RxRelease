import Axios from 'axios';
import GlobalSettings from '../config/global'
import LogFactory from '../logging/LogFactory'


var settings = new GlobalSettings();
var paLogger = new LogFactory().createLogger("TOPLEVEL","ACTIONCREATOR")

export function loadProfilesPanel() {
  return {
    type: 'LOAD_PROFILES_PANEL'
  }
}
export function loadHostsPanel() {
  return {
    type: 'LOAD_HOSTS_PANEL'
  }
}
