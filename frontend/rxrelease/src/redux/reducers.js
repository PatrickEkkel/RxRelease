
var initialMenuState = { type: 'INITIAL_SELECTED_MENU', selectedMenu: 'Profiles'}
var initialProfileState = { type: 'INITIAL_PROFILES_STATE', showModal: false}

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
    case 'GET_TIME_REQUEST':
      return {
        frozen: true
      }
    default:
      return state
  }
}

export function _profiles(state = initialProfileState,action) {
    console.log('_menu reducer called with state ', state , ' and action ', action);
    

  switch (action.type) {
    case 'OPEN_NEW_PROFILE':
     return {
       type: action.type,
        showModal: true
     }
      break;
    case 'SAVE_NEW_PROFILE':
    return {
      type: action.type,
      showModal: false
    }
    case 'PROFILES_LOADED':
    return {
      type: action.type,
      showModal: false

    }
    case 'CLOSE_MODAL':
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
    default:
      return state

  }
}
