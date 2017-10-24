
import Axios from 'axios';
import Host from '../models/host'
import HostFactory from '../factories/hostFactory'
import StateFactory from '../factories/stateFactory'
import SettingsFactory from '../factories/settingsFactory'
import GlobalSettings from '../config/global'
import  * as settingsRequests from '../rest/requests/settingsrequests'
import  * as hostsRequests from '../rest/requests/hostrequests'
import  * as statesRequests from '../rest/requests/statesrequests'
import  * as settingsPromises from '../rest/promises/settingspromises'
import  * as jsonUtils from '../lib/json/utils'


var settings = new GlobalSettings();

export function initialHostState() {
  return {
    type: 'INITIAL_HOSTS_STATE'
  }
}

export function loadHostManagement(hostentry) {
  var host = HostFactory.convertMapToHost(hostentry)
  var settingsfactory = new SettingsFactory()
  var factory = new StateFactory()

  return function (dispatch) {
      statesRequests.getStatesByHost(host)
      .then(function(response) {
        var states = factory.convertJsonList(response.data)
        host.setStates(states);

      }).then(function(response) {
        // we don't have the credentials id available so we need to do a call to the backend to retrieve it
          return hostsRequests.getHostById(host.getId())
        // load the credentials
      }).then(function(response) {

        var data = jsonUtils.normalizeJson(response.data);
        var connectioncredentials_id =  data.connectioncredentials
        return settingsRequests.getCredentialSettingsByHostById(connectioncredentials_id);
      }).then(function(response) {

        var data = jsonUtils.normalizeJson(response.data);

        var connectioncredentials =  settingsfactory.createCredentialSettingFromJson(data);
        console.log("connectioncredentials zien er nu als volgt uit")
        console.log(connectioncredentials)
        host.setConnectionCredentials(connectioncredentials)
        return settingsRequests.getCredentialSettingsByHostById(data.category);
      }).then(function(response) {
        // TODO: dit testen, hier waren we dus gebleven
        var data = jsonUtils.normalizeJson(response.data);
        var settingsFactory = new SettingsFactory();
        var settingscategory = settingsFactory.createSettingsCategoryFromJson(data);
        host.getConnectionCredentials().setSettingCategory(settingscategory)
        dispatch(hostManagementLoaded(host));

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

      Axios.get('http://localhost:8080/rxbackend/hosts/')
      .then(function(response){

        var factory = new HostFactory();
        var hostList = factory.convertJsonList(response.data)

          dispatch(hostsLoaded(hostList));
      });
  }
}

export function hostsLoaded(hosts) {
  return {
    type: 'HOSTS_LOADED',
    hosts: hosts
  }
}

export function updateHost(host) {
  return function (dispatch) {
    if(host.getHostname() != '' && host.getIpaddress() != '') {
      hostsRequests.putHost(host).then(function() {
       return settingsRequests.putCredentialSettings(host.getConnectionCredentials())
     }).then(function() {
       dispatch({
           type: 'UPDATE_EXISTING_HOST',
           host: host
       })
     });
    }
  }
}

export function saveNewHost(hostname,ipaddress,description) {

  var settingsfactory = new SettingsFactory()
  var hostfactory = new HostFactory()

  return function (dispatch) {
    if (hostname != '' && ipaddress != '') {
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
      return settingsRequests.postSettings('test','test,',settingscategory)
    }).then(function(response) {

      var connectioncredentials = settingsfactory.createCredentialSettingFromJson(jsonUtils.normalizeJson(response.data))
      var host =  hostfactory.createHost(hostname,ipaddress,description)
      console.log("connectioncredentials bestaat uit de volgende bullshit")
      console.log(connectioncredentials.getId())
      host.setConnectionCredentials(connectioncredentials)
      return hostsRequests.postHost(host);
    }).then(function(response) {
      dispatch({
        type: 'SAVE_NEW_HOST'
      })
    });
    }
  }
}
