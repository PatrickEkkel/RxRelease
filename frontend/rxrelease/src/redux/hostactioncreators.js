
import Axios from 'axios';
import Host from '../models/host'
import LogFactory from '../logging/LogFactory'
import HostFactory from '../factories/hostFactory'
import StateModel from '../models/dbmodels/statemodel'
import SimpleStateModel from '../models/dbmodels/simplestatemodel'
import StateFactory from '../factories/stateFactory'
import SettingsFactory from '../factories/settingsFactory'
import PromiseExecutor from '../lib/promises/promise_executor'
import ProfileTypeFactory from '../factories/profiletypeFactory'
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

export function saveNewHost(hostname,ipaddress,description,profiletype) {
  var settingsfactory = new SettingsFactory();
  var hostfactory = new HostFactory();
  //var profiletypefactory = new ProfileTypeFactory();
  var errorHandler = new AggregatedFieldsErrorHandler();

  return function (dispatch) {
    // before we save the host we want to initialize the new SettingsCategory
    // check if it already exists
    var search_string =  encodeURI(settings.SETTING_CATEGORY_HOSTNAME)
    settingsRequests.getSettingCategoryByName(search_string).then(function(response) {
      return response;
    }).then(function(response) {

        var normalizedData = jsonUtils.normalizeJson(response.data)
        // if the response from getting the category is null, create a new category
        if(normalizedData == null) {
          return settingsRequests.postSettingCategory(settings.SETTING_CATEGORY_HOSTNAME);
        }
        else {
          return response;
        }
    })
    .then(function(response) {
       var settingscategory = settingsfactory.createSettingsCategoryFromJson(jsonUtils.normalizeJson(response.data));
       // TODO: dit is niet goed natuurlijk, hier moeten we settings meegeven vanuit de GUI
      return settingsRequests.postSettings('test','test,',settingscategory)
    })
    .then(function(response) {

      var connectioncredentials = settingsfactory.createCredentialSettingFromJson(jsonUtils.normalizeJson(response.data))

      var host =  hostfactory.createHost(hostname,ipaddress,description,profiletype)
      haLogger.trace("post new Host")
      haLogger.traceObject(host)

      host.setConnectionCredentials(connectioncredentials)
      return hostsRequests.postHost(host);
    })
    .then(function(response) {

      haLogger.trace("Saved host object:")
      haLogger.traceObject(response.data)
      dispatch({
        type: 'SAVE_NEW_HOST',
        saved_host: response.data
      })
    }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_HOST_FAILED',dispatch)
    });
  }
}
