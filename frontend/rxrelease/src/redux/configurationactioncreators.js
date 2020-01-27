import Axios from 'axios';
import LogFactory from '../logging/LogFactory'
import PromiseExecutor from '../lib/promises/promise_executor'
import GlobalSettings from '../config/global'

import * as configurionpromises from '../rest/promises/configurationpromises'
import * as capabilitypromises  from '../rest/promises/capabilitypromises'


var settings = new GlobalSettings();
var caLogger = new LogFactory().createLogger("PROFILECONFIGURATION","ACTIONCREATOR")


export function openNewConfiguration() {
  return {
      type: 'OPEN_NEW_CONFIGURATION',
  }
}
/*export function configurationComplete() {
  return {
    type: 'CONFIGURATION_COMPLETE'
  }
}*/
export function initialConfigurationState(selected_profile) {
  return {
    type: 'INITIAL_CONFIGURATION_STATE',
    selected_profile: selected_profile,
    showModal: false
  }
}
export function loadConfigurations(selected_profile) {
    return function (dispatch) {
      var retrievedData = [];
      if (selected_profile != null) {
      Axios.get('http://localhost:8080/rxbackend/configurations/profile/' + selected_profile[0]).then(function(response){
        for(var i=0;i<response.data.length;i++) {
        retrievedData[i] = [response.data[i].id,response.data[i].name,response.data[i].type];
        }
          dispatch(configurationLoaded(retrievedData,selected_profile));
      });
      }
    }
  }
  export function configurationLoading() {
    return {
      type: 'CONFIGURATION_LOADING'
    }
  }
  export function configurationLoaded(configurations,selected_profile) {
    return {
      type: 'CONFIGURATION_LOADED',
      configurations: configurations,
      selected_profile: selected_profile
    }
  }
export function saveNewConfiguration(configuration_name,selected_profile) {
    var e = new PromiseExecutor();


    return function (dispatch) {
      e.execute(configurionpromises.CREATE_CONFIGURATION,{logger: caLogger, configuration_name: configuration_name, selected_profile: selected_profile})()
      .then(e.execute(capabilitypromises.CREATE_CAPABILITY,{name: configuration_name}))
      .then(function(response) {
        dispatch( {
            type: 'SAVE_NEW_CONFIGURATION',
        })
      })

      /*Axios.post('http://localhost:8080/rxbackend/configurations/',
          {
          name: configuration_name,
          profile: selected_profile[0],
          hosts: []
        }).then(function() {
          dispatch( {
              type: 'SAVE_NEW_CONFIGURATION',
          })
        });*/
    }
  }
