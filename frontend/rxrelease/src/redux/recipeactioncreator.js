import Axios from 'axios';


export function loadRecipePanelFromConfiguration(selected_configuration) {
  return {
    type: 'LOAD_RECIPE_FROM_CONFIGURATION',
    selected_configuration: selected_configuration
  }
}

export function saveAllRecipeChildren(addedHosts,selected_configuration,selected_profile,configuration_name) {
  return function (dispatch) {
    if (selected_configuration != null && addedHosts != null && configuration_name != null && selected_profile != null) {
      // reduce dataset to bare minimum
      var newAddedHosts = []
      for(var i=0;i<addedHosts.length;i++) {
        newAddedHosts.push(addedHosts[i][0])
      }
    Axios.put('http://localhost:8080/rxbackend/configurations/' + selected_configuration + "/",
        {
        hosts: newAddedHosts,
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
export function loadHostsForRecipe() {
    return function (dispatch) {
      var retrievedData = [];
      Axios.get('http://localhost:8080/rxbackend/hosts/').then(function(response){
        for(var i=0;i<response.data.length;i++) {
          var id = response.data[i].id;
          var hostname  = response.data[i].hostname;
          var ipaddress = response.data[i].ipaddress;
          var description = response.data[i].description;
        retrievedData[i] = [id,hostname,ipaddress,description];
        }
          dispatch(hostsLoaded(retrievedData));
      });

    }
  }
 export function hostsLoaded(hosts) {
   return {
     type: 'LOAD_HOSTS_FOR_RECIPE',
     hosts: hosts
   }
 }
