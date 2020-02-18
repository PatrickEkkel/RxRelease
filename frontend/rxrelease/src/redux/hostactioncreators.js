
import Axios from 'axios';
import Host from '../models/host'
import LogFactory from '../logging/LogFactory'
import HostFactory from '../factories/hostFactory'
import StateModel from '../models/dbmodels/statemodel'
import HostModel from '../models/dbmodels/hostmodel'
import KVSettingModel from '../models/dbmodels/kvsettingmodel'
import SettingsCategoryModel from '../models/dbmodels/settingscategorymodel'
import SimpleStateModel from '../models/dbmodels/simplestatemodel'
import CredentialsModel from '../models/dbmodels/credentialsmodel'
import StateFactory from '../factories/stateFactory'
import SettingsFactory from '../factories/settingsFactory'
import PromiseExecutor from '../lib/promises/promise_executor'
import GlobalSettings from '../config/global'
import AggregatedFieldsErrorHandler from '../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as commonActions from './commonactions'
import  * as settingsRequests from '../rest/requests/settingsrequests'
import  * as hostsRequests from '../rest/requests/hostrequests'
import  * as statesRequests from '../rest/requests/statesrequests'
import  * as settingsPromises from '../rest/promises/settingspromises'
import  * as jsonUtils from '../lib/json/utils'
import  * as hostPromises from '../rest/promises/hostpromises'


var settings = new GlobalSettings();
var haLogger = new LogFactory().createLogger("HOSTS","ACTIONCREATOR")


export function initialHostState() {
  return {
    type: 'INITIAL_HOSTS_STATE'
  }
}

export function installHost(host) {
  return function (dispatch) {
    hostsRequests.putInstallHost(host).then(function(response) {
      dispatch(hostInstalled(host))
    })
  }
}
export function getHostByProfiletypeId(profiletype_id) {

return function (dispatch) {
  hostsRequests.getHostsByProfiletypeId(profiletype_id).then(function(response) {

    haLogger.trace("Hosts by profiletype ID")
    var factory = new HostFactory();
    var hostList = factory.convertJsonList(response.data)
    dispatch(hostsLoaded(hostList))
  })

}

}
export function hostInstalled(host) {
  return {
    type: 'HOST_INSTALLED',
    installed_host: host
  }
}

export function loadHostManagement(hostentry) {
  var host = HostFactory.convertMapToHost(hostentry)
  var settingsfactory = new SettingsFactory()
  var factory = new StateFactory()
  var e = new PromiseExecutor()
  return function (dispatch) {
      statesRequests.getStatesByHost(host)
      .then(e.execute(hostPromises.GET_STATES_FOR_HOST,{logger: haLogger,current_host: host}))
      .then(function(response) {
        var data = jsonUtils.normalizeJson(response.data);
        var connectioncredentials_id =  data.connectioncredentials
        return settingsRequests.getCredentialSettingsByHostById(connectioncredentials_id);
      }).then(function(response) {
        var data = jsonUtils.normalizeJson(response.data);

        var connectioncredentials =  settingsfactory.createCredentialSettingFromJson(data);
        host.setConnectionCredentials(connectioncredentials)
        return settingsRequests.getSettingsCategoryById(data.category);
      }).then(function(response) {
        var data = jsonUtils.normalizeJson(response.data);
        var settingscategory = settingsfactory.createSettingsCategoryFromJson(data);
       host.getConnectionCredentials().setSettingCategory(settingscategory)

       haLogger.trace('dispatch LOAD_HOST_MANAGEMENT_FROM_HOSTS')
       haLogger.traceObject(host)
       dispatch(hostManagementLoaded(host));

     }).catch(function(error) {
       console.log(error)
       haLogger.debug(error)
     });
  }
}
export function hostManagementLoaded(host) {
  return {
     type: 'LOAD_HOST_MANAGEMENT_FROM_HOSTS',
     selected_host: host
  }
}

export function openNewHost(hostentry) {

  return {
    type: 'OPEN_NEW_HOST'
    }
}

export function loadHosts() {
  return function (dispatch) {

      hostsRequests.getHosts()
      .then(function(response){

        var factory = new HostFactory();
        var hostList = factory.convertJsonList(response.data)

          dispatch(hostsLoaded(hostList));
      }).catch(function(error) {
        commonActions.notAuthorized(error.response.status,error,dispatch)
      })
  }
}

export function hostsLoaded(hosts) {
  return {
    type: 'HOSTS_LOADED',
    hosts: hosts
  }
}

export function hostupdated(host) {
  return {
    type: 'EXISTING_HOST_UPDATED',
    selected_host: host
  }
}
export function updateHost(host) {
  var errorHandler = new AggregatedFieldsErrorHandler();

  return function (dispatch) {
      hostsRequests.putHost(host).catch(function(error) {
        errorHandler.addErrorResponse(error)
      }).then(function() {
       return settingsRequests.putCredentialSettings(host.getConnectionCredentials());
     }).then(function() {
       if(!errorHandler.handleErrors('UPDATE_EXISTING_HOST_FAILED',dispatch)) {
       dispatch({
           type: 'UPDATE_EXISTING_HOST',
           selected_host: host,
       })
     }
     }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('UPDATE_EXISTING_HOST_FAILED',dispatch)
     });
  }
}

export function saveNewHost(hostname,ipaddress,description,profile) {
  var settingsfactory = new SettingsFactory();
  var hostfactory = new HostFactory();
  //var profiletypefactory = new ProfileTypeFactory();
  var errorHandler = new AggregatedFieldsErrorHandler();
  var settingscategory = null;
  var host = HostModel.newHost("", hostname, ipaddress, description, profile)
  var e = new PromiseExecutor()
  return function (dispatch) {
    // before we save the host we want to initialize the new SettingsCategory
    // check if it already exists
    var settings = new GlobalSettings();
    var search_string =  encodeURI(settings.SETTING_CATEGORY_HOSTNAME)

    var ssh_creds = CredentialsModel.newCredentials('test','test')

    settingsRequests.getSettingCategoryByName(search_string)
    .then(e.execute(settingsPromises.CREATE_SETTINGSCATEGORY_IF_NOT_EXISTS_NEW,{logger: haLogger,category: settings.SETTING_CATEGORY_HOSTNAME}))
    .then(e.execute(settingsPromises.UPDATE_SETTINGS_WITH_CATEGORY,{logger: haLogger, salt_api_creds: ssh_creds}))
    .then(e.execute(settingsPromises.CREATE_CREDENTIAL_SETTINGS_NEW,{logger: haLogger, salt_api_creds: ssh_creds }))
    .then(e.execute(hostPromises.CREATE_HOST_WITH_CONNECTION_CREDENTIALS,{logger: haLogger,current_host: host}))
    .then(e.execute(hostPromises.DISPATCH_SAVE_HOST,{logger: haLogger, dispatch: dispatch}))
    .then(e.execute(settingsPromises.GET_OR_CREATE_SETTINGSCATEGORY_FROM_HOST, {logger: haLogger, category: host.getHostname()}))
    .then(e.execute(settingsPromises.GET_OR_CREATE_SETTING,{ logger: haLogger, category_name: settings.SETTING_CATEGORY_GLOBAL,key: 'sshport',value: '22' }))
    .catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_HOST_FAILED',dispatch)
    });
  }
}
