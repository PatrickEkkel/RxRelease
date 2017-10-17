
import Axios from 'axios';
import Host from '../models/host'
import HostFactory from '../factories/hostFactory'
import StateFactory from '../factories/stateFactory'
import SettingsFactory from '../factories/settingsFactory'
import GlobalSettings from '../config/global'
import  * as settingsRequests from '../rest/requests/settingsrequests'
import  * as hostsRequests from '../rest/requests/hostrequests'
import  * as settingsPromises from '../rest/promises/settingspromises'
import  * as jsonUtils from '../lib/json/utils'


var settings = new GlobalSettings();

export function initialHostState() {
  return {
    type: 'INITIAL_HOSTS_STATE'
  }
}

export function loadHostManagement(hostentry) {
  console.log("what is the value of hostentry");
  console.log(hostentry)
  var host = HostFactory.convertMapToHost(hostentry)
  return function (dispatch) {

      Axios.get('http://localhost:8080/rxbackend/states/search/?host_id=' + host.getId())
      .then(function(response) {
        var factory = new StateFactory()
        var settingsfactory = new SettingsFactory()
        var states = factory.convertJsonList(response.data)
        host.setStates(states);
        // we need to make a call to the backend to get the connectioncredentials id,
        Axios.get('http://localhost:8080/rxbackend/hosts/' + host.getId()).then(function(response) {

            var connectioncredentials_id  = response.data['connectioncredentials'];
            if(connectioncredentials_id == null) {

              var settings = settingsfactory.newEmpyCredentials();
              Axios.post('http://localhost:8080/rxbackend/settings/credentials',{
                password: settings.getPassword(),
                username: settings.getUsername(),
                category: 0
              }).then(function(response) {
                    var connection_credentials = settingsfactory.createCredentialSettingFromJson(response.data)
                    host.setConnectionCredentials(connection_credentials);
                    console.log("hij bestaat nog niet daarom toon ik hem nu hier")
                    console.log(connection_credentials)
              });
             // create a new credentials setting and post it directly to the backend
            }
            // if credentials do already exist, then we just nee to fetch them from the backends
            else {
              Axios.get('http://localhost:8080/rxbackend/settings/credentials/' + connectioncredentials_id)
              .then(function(response) {
                 var connection_credentials = settingsfactory.createCredentialSettingFromJson(response.data)
                 host.setConnectionCredentials(connection_credentials);
                 console.log("hij bestaat al en daarom toon ik hem hier")
                 console.log(connection_credentials)
              });
            }
            dispatch(hostManagementLoaded(host));
        });
        //host.setConnectionCredentials(null);
      })
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
      Axios.put('http://localhost:8080/rxbackend/hosts/' + host.getId() + "/",
     {
       hostname: host.getHostname(),
       ipaddress: host.getIpaddress(),
       description: host.getDescription()
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
