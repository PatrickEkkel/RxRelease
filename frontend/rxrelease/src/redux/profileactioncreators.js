import Axios from 'axios';
import Profile from '../models/profile'
import ProfileType from '../models/profiletype'

export function newProfileEntry(key,value) {
  return {
    type: 'NEW_PROFILE_ENTRY',
    [key]: value
  }
}
export function openNewProfile() {
  return {
      type: 'OPEN_NEW_PROFILE',
  }
}

export function loadProfiletypes() {
  return function (dispatch) {
      var profiletypes = [];
      Axios.get('http://localhost:8080/rxbackend/profiletypes/')
      .then(function(response){
        for(var i=0;i<response.data.length;i++) {

        profiletypes[i] = new ProfileType(response.data[i].id,response.data[i].name)
        }
          dispatch(profileTypesLoaded(profiletypes));
      });
  }
}

export function profileTypesLoaded(profiletypes) {
  return {
    type: 'PROFILE_TYPES_LOADED',
    profiletypes: profiletypes
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
export function initialProfilesBreadcrumbstate() {
  return {
    type: 'INITIAL_PROFILE_BREADCRUMBSTATE'
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
        profiletype: profile_type
      }).then(function() {
        dispatch( {
            type: 'SAVE_NEW_PROFILE',
        })
      });
    }
  }
}
