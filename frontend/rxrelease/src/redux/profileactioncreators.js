import Axios from 'axios';
import Profile from '../models/profile'
import ProfileFactory from '../factories/profileFactory'
import LogFactory from '../logging/LogFactory'
import GlobalSettings from '../config/global'
import AggregatedFieldsErrorHandler from '../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as profileRequests from '../rest/requests/profilerequests'
import  * as commonActions from './commonactions'


var settings = new GlobalSettings();
var paLogger = new LogFactory().createLogger("PROFILES","ACTIONCREATOR")


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


export function loadProfile(name) {
  return function(dispatch) {
    profileRequests.getProfilebyName(name).then(function(response) {
      var id = response.data[0].id;
      var name = response.data[0].name;
      var p = new Profile(id, name)
      dispatch(profileLoaded(p))
    })
  }
}

export function loadProfiles() {
  return function (dispatch) {
      var retrievedData = [];
      profileRequests.getProfiles().then(function(response){

        for(var i=0;i<response.data.length;i++) {
          var id = response.data[i].id;
          var name = response.data[i].name;
          var p = new Profile(id,name,null)
          retrievedData.push(p)
        }
          dispatch(profilesLoaded(retrievedData));
      }).catch(function(error) {
         console.log(error)
         commonActions.notAuthorized(error.response.status,error,dispatch)
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
export function profileLoaded(profile) {
  return {
    type: 'PROFILE_LOADED',
    profile: profile
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

    var errorHandler = new AggregatedFieldsErrorHandler();
    var profileFactory = new ProfileFactory();
    var profile =  profileFactory.createProfile(profile_name,profile_type);
    profileRequests.postProfile(profile).then(function() {
        dispatch( {
            type: 'SAVE_NEW_PROFILE',
        })
      }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_PROFILE_FAILED',dispatch)
      });

  }
}
