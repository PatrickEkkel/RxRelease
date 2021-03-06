import Axios from 'axios';
import Host from '../models/host';
import HostFactory from '../factories/hostFactory';
import StandardListConverters from '../converters/StandardListConverters';

export function loadRecipePanelFromConfiguration(selected_configuration,selected_profile) {
  return {
    type: 'LOAD_RECIPE_FROM_CONFIGURATION',
    selected_configuration: selected_configuration,
    selected_profile: selected_profile
  }
}

export function saveAllRecipeChildren(addedHosts,selected_configuration,selected_profile,configuration_name) {
  return function (dispatch) {
    if (selected_configuration != null && addedHosts != null && configuration_name != null && selected_profile != null) {

    Axios.put('http://localhost:8080/rxbackend/configurations/' + selected_configuration + "/",
        {
        hosts: StandardListConverters.convertObjectListToPk(addedHosts),
        name: configuration_name,
        profile: selected_profile
      }).then(function() {
        dispatch( {
            type: 'SAVE_ALL_RECIPE_CHILDREN',

        })
      });
    }
  }
}
export function loadHostsForRecipe(selected_configuration) {

    var factory = new HostFactory();
    return function (dispatch) {
      var availableHosts = null;
      Axios.get('http://localhost:8080/rxbackend/hosts/').then(function(response) {
        availableHosts = factory.convertJsonList(response.data);
        Axios.get('http://localhost:8080/rxbackend/configurations/' + selected_configuration).then(function(response) {
          var hostids = response.data.hosts
           if(hostids.length > 0)  {
            for(var i=0;i<hostids.length;i++) {
            Axios.get('http://localhost:8080/rxbackend/hosts/' + hostids[i]).then(function(response) {
                var newHost = factory.createHostFromJson(response.data)
                dispatch(hostsLoaded(availableHosts,newHost));
            })
          }
        }
          else {
            dispatch(hostsLoaded(availableHosts,null));
          }
        });
      });
    }
  }
 export function hostsLoaded(availableHosts,addedHost) {

   return {
     type: 'LOAD_HOSTS_FOR_RECIPE',
     hosts: availableHosts,
     addedHost: addedHost
   }
 }
