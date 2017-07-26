import Axios from 'axios';

export function loadDockercomposeConfiguration(selected_configuration) {
    return function (dispatch) {

      if (selected_configuration != null) {
      Axios.get('http://localhost:8080/rxbackend/rxdockercompose/configurations/' + selected_configuration).then(function(response){
        console.log(response.data);
        var data = response.data
          dispatch(configurationLoaded(data.dockercomposeyaml));
      });
      }
    }
  }

  export function saveConfiguration(docker_compose_yaml,selected_configuration) {
    console.log("geef mij de selected_profile: " + selected_configuration)
    return function (dispatch) {
      if (selected_configuration != null) {
      Axios.put('http://localhost:8080/rxbackend/rxdockercompose/configurations/' + selected_configuration,
          {
          dockercomposeyaml: docker_compose_yaml,
        }).then(function() {
          dispatch( {
              type: 'SAVE_NEW_DC_CONFIGURATION',
          })
        });
      }
    }
  }
  export function configurationLoaded(docker_compose_yaml) {
    return {
      type: 'DC_CONFIGURATION_LOADED',
      docker_compose_yaml: docker_compose_yaml
    }
  }
