import Axios from 'axios';
import Profile from '../models/profile'

export function newProfileEntry(key,value) {
  return {
    type: 'NEW_PROFILE_ENTRY',
    [key]: value
  }
}
export function openNewProfile(profiles_list) {
  return {
      type: 'OPEN_NEW_PROFILE',
      profiles: profiles_list
  }
}
export function loadProfiles() {
  return function (dispatch) {
      var retrievedData = [];
      Axios.get('http://localhost:8080/rxbackend/profiles/')
      .then(function(response){
        for(var i=0;i<response.data.length;i++) {
          var id = response.data[i].id;
          var name = response.data[i].name;
          var type = response.data[i].type;
          var p = new Profile(id,name,type)

        retrievedData[i] = [id,name,type];
        }
          dispatch(profilesLoaded(retrievedData));
      });
  }
}
export function initialProfilesState() {
  return {
    type: 'INITIAL_PROFILES_STATE',
  }
}
export function profilesLoaded(profiles) {
  return {
    type: 'PROFILES_LOADED',
    profiles: profiles
  }
}

export function loadConfigurationsPanel(selected_profile) {
  return {
    type: 'LOAD_CONFIGURATION_FROM_PROFILES',
    selected_profile: selected_profile
  }
}
export function saveNewProfile(profile_name,profile_type) {
  return function (dispatch) {
    if (profile_name != '' && profile_type != '') {
    Axios.post('http://localhost:8080/rxbackend/profiles/',
        {
        name: profile_name,
        type: profile_type
      }).then(function() {
        dispatch( {
            type: 'SAVE_NEW_PROFILE',
        })
      });
    }
  }
}
