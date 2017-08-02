import Axios from 'axios';
import DcConfigurationFactory from '../factories/dcConfigurationFactory'

export function loadDockercomposeConfiguration(configuration) {
    return function (dispatch) {

      if (configuration != null) {
      Axios.get('http://localhost:8080/rxbackend/rxdockercompose/configurations/byrootid/' + configuration.getId()).then(function(response){
        var data = response.data
          if(data.length > 0) {
            var factory = new DcConfigurationFactory();
            var dcConfiguration =  factory.createDcConfigurationFromJson(data)
            dcConfiguration.setConfiguration(configuration);
            dispatch(configurationLoaded(dcConfiguration));
          }
          else {
            Axios.post('http://localhost:8080/rxbackend/rxdockercompose/configurations/',
            {
              dockercomposeyaml: " ",
              configuration: configuration.getId()

            }
          ).then(function() {
            dispatch(loadDockercomposeConfiguration(configuration))
          });
          }
      });
      }
    }
  }
  function getDockerComposeConfigurationbyRootId(callback,cofiguration_id) {
    Axios.get('http://localhost:8080/rxbackend/rxdockercompose/configurations/byrootid/' + configuration.getId()).then(function(response) {
      if(data.length > 0) {
       var factory = new DcConfigurationFactory();
       var dcConfiguration =  factory.createDcConfigurationFromJson(data)
       dcConfiguration.setConfiguration(configuration);
       callback('DC_CONFIGURATION_INITIALIZED')
       dispatch(configurationLoaded(dcConfiguration));
      }
      else {
        callback('DC_CONFIGURATION_BOOTSTRAP');
      }
    });
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
  export function configurationLoaded(dcConfiguration) {
    return {
      type: 'DC_CONFIGURATION_LOADED',
      dcConfiguration: dcConfiguration
    }
  }
