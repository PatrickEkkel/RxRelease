
var initialMenuState = { type: 'INITIAL_SELECTED_MENU', selectedMenu: 'Profiles'}
var initialProfileState = { type: 'INITIAL_PROFILES_STATE', showModal: false}
var initialConfigurationState = { type: 'INITIAL_CONFIGURATION_STATE', showModal: false}
var initialRecipeState = { type: 'INITIAL_RECIPE_STATE',showModal: false}
var initialHostState = { type: 'INITIAL_HOSTS_STATE', showModal: false }

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// from state. So it's just a personal preference here and you may not need this depending on
// how your reducers are named and what properties they expose in Redux's store.
export function _menu(state = initialMenuState, action) {
  console.log('_menu reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'CHANGE_SELECTED_MENU':
      return {
        type: 'CHANGE_SELECTED_MENU',
        selectedMenu:  action.selectedMenu
      }
    default:
      return state
  }
}

export function _host(state = initialHostState,action) {
  console.log('_host reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    case 'INITIAL_HOSTS_STATE':
    return {
      type: action.type,
      showModal: false
    }
    case 'OPEN_NEW_HOST':
    return {
      type: action.type,
      showModal: true
    }

    case 'SAVE_NEW_HOST':
    return {
      type: action.type,
      showModal: false
    }
    default:
    return state;

  }
}

export function _configuration(state = initialConfigurationState,action) {
  console.log('_configuration reducer called with state ', state , ' and action ', action);
  console.log('_configuration reducer called with state ', state , ' and action ', action);
  switch (action.type) {

    case 'INITIAL_CONFIGURATION_STATE':
      return {
        type: action.type
      }
    case 'OPEN_NEW_CONFIGURATION':
    return {
        type: action.type,
        showModal: true,
        configurations: action.configurations
    }
    case 'SAVE_NEW_CONFIGURATION':
    return {
      type: action.type,
      showModal: false,
      configurations: action.configurations
    }
    case 'CONFIGURATION_LOADING':
    return {
      type: action.type,
      showModal: false
    }
    case 'CONFIGURATION_LOADED':
    return {
      type: action.type,
      showModal: false,
      configurations: action.configurations
    }
    case 'CONFIGURATION_COMPLETE':
      return  {
        type: action.type,
        showModal: false,
      }

    case 'LOAD_CONFIGURATION_FROM_PROFILES':
    return {
      type: action.type,
      selected_profile: action.selected_profile,
      showModal: false
    }
    default:
    return state;

  }
}


export function _recipe(state = initialRecipeState,action) {
  console.log('_recipe reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    default:
    return state;
  }
}

export function _profiles(state = initialProfileState,action) {
    console.log('_profiles reducer called with state ', state , ' and action ', action);


  switch (action.type) {
    case 'INITIAL_PROFILES_STATE':
    return {
      type: action.type,
      showModal: false,
      profiles: action.profiles
    }
    case 'SAVE_NEW_PROFILE':
    return {
      type: action.type,
      showModal: false
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
        profiles: action.profiles
     }
     case 'SAVE_NEW_PROFILE':
     return {
       type: action.type,
       showModal: false
     }

    case 'NEW_PROFILE_ENTRY':
    return {
        type: action.type,
        profile_name: action.profile_name,
        profile_type: action.profile_type,
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
