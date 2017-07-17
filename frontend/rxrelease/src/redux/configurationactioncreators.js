import Axios from 'axios';

export function openNewConfiguration() {
  return {
      type: 'OPEN_NEW_CONFIGURATION',
  }
}
export function configurationComplete() {
  return {
    type: 'CONFIGURATION_COMPLETE'
  }
}
export function initialConfigurationState() {
  return {
    type: 'INITIAL_CONFIGURATION_STATE',
    showModal: false
  }
}
export function loadConfigurations(selected_profile) {
    return function (dispatch) {
      var retrievedData = [];
      if (selected_profile != null) {
      Axios.get('http://localhost:8080/rxbackend/configurations/profile/' + selected_profile[0]).then(function(response){
        for(var i=0;i<response.data.length;i++) {
        retrievedData[i] = [i,response.data[i].name,response.data[i].type];
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
  export function configurationLoaded(configurations) {
    return {
      type: 'CONFIGURATION_LOADED',
      configurations: configurations,
    }
  }
export function saveNewConfiguration(configuration_name,selected_profile) {

    console.log("geef mij de selected_profile: " + selected_profile)
    return function (dispatch) {
      if (configuration_name != '' && selected_profile != null) {
      Axios.post('http://localhost:8080/rxbackend/configurations/',
          {
          name: configuration_name,
          profile: selected_profile[0]
        }).then(function() {
          dispatch( {
              type: 'SAVE_NEW_CONFIGURATION',
          })
        });
      }
    }
  }
