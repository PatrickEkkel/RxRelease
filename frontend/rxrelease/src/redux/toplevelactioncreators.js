import Axios from 'axios';
import GlobalSettings from '../config/global'
import LogFactory from '../logging/LogFactory'
import  * as loginRequests from '../rest/requests/loginrequests'


var settings = new GlobalSettings();
var paLogger = new LogFactory().createLogger("TOPLEVEL","ACTIONCREATOR")

export function loadProfilesPanel() {
  return {
    type: 'LOAD_PROFILES_PANEL'
  }
}
export function logout() {

  return function (dispatch) {
      loginRequests.getLogout().then(function(response) {
        dispatch(logoutMessage())
     });
  }
}

export function logoutMessage() {
  return {
    type: 'LOGOUT'
  }
}
export function loadSettingsPanel() {
  return {
    type: 'LOAD_SETTINGS_PANEL'
  }
}
export function loadModulePanel(panelId) {
  return {
    type: 'LOAD_MODULE_PANEL',
    PanelId: panelId
  }
}

export function loadLoggingPanel() {
  return {
    type: 'LOAD_LOGGING_PANEL'
  }
}

export function loadConfigurationPanel() {
  return {
    type: 'LOAD_CONFIGURATION_PANEL'
  }
}
export function loadHostsPanel() {
  return {
    type: 'LOAD_HOSTS_PANEL'
  }
}
