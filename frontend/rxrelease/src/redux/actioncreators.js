import Axios from 'axios';


/* Async message example */
export function SendMessage (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'GET_TIME_REQUEST',
                message
            })
        }, 2000)
    }
}
/* Sync message example */
export function changeSelectedMenu(selectedMenu) {

  return {
      type: 'CHANGE_SELECTED_MENU',
      selectedMenu
  }
}


export function openNewProfile() {
  return {
      type: 'OPEN_NEW_PROFILE'
  }
}


export function closeModal() {
  return {
    type: 'CLOSE_MODAL'
  }
}
export function profileIsLoaded() {
  return {
    type: 'PROFILES_LOADED'
  }
}
export function newProfileEntry(key,value) {
  return {
    type: 'NEW_PROFILE_ENTRY',
    [key]: value
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
