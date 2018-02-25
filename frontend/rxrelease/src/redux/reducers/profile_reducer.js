import ReducerLogFactory from '../../logging/ReducerLogFactory';
var initialProfileState = { type: 'INITIAL_PROFILES_STATE', showModal: false}

export default function _profiles(state = initialProfileState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('PROFILES',state,action);
  switch (action.type) {


    case 'INITIAL_PROFILES_STATE':
    return {
      type: action.type,
      showModal: false,
      profiles: action.profiles
    }
    case 'AUTHENTICATION_ERROR':
    return {
      type: action.type,
      showModal: false,
    }
    case 'SAVE_NEW_PROFILE':
    return {
      type: action.type,
      showModal: false
    }
    case 'SAVE_NEW_PROFILE_FAILED':
    return {
      type: action.type,
      showModal: true,
      error_fields: action.error_fields
    }
    case 'PROFILES_LOADED':
    return {
      type: action.type,
      showModal: false,
      profiles: action.profiles

    }
    case 'OPEN_NEW_PROFILE':
     return {
       type: action.type,
        showModal: true,
     }
     case 'SAVE_NEW_PROFILE':
     return {
       type: action.type,
       showModal: false
     }
    case 'PROFILE_TYPES_LOADED':
    return {
      type: action.type,
      profiletypes: action.profiletypes,
    }
    case 'NEW_PROFILE_ENTRY':
    return {
        type: action.type,
        name: action.name,
        profiletype: action.profiletype,
        showModal: true
    }
    case 'LOAD_CONFIGURATION_FROM_PROFILES':
    return {
        type: action.type,
        selected_profile: action.selected_profile
    }
    case 'LOAD_RECIPE_FROM_CONFIGURATION':
    return {
      type: action.type
    }
    default:
      return state

  }
}
