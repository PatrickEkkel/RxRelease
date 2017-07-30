import Axios from 'axios';

export function loadDockercomposeConfiguration(selected_configuration) {
    return function (dispatch) {

      if (selected_configuration != null) {
      Axios.get('http://localhost:8080/rxbackend/rxdockercompose/configurations/byrootid/' + selected_configuration).then(function(response){
        var data = response.data
          if(data.length > 0) {
            dispatch(configurationLoaded(data[0].dockercomposeyaml));
          }
          else {
            Axios.post('http://localhost:8080/rxbackend/rxdockercompose/configurations/',
            {
              dockercomposeyaml: " ",
              configuration: selected_configuration

            }
          ).then(function() {
            return loadDockercomposeConfiguration(selected_configuration)
          });
          }
      });
      }
    }
  }

  export function saveConfiguration(docker_compose_yaml,selected_configuration) {
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
