import Axios from 'axios';

import * as profileActionCreators from './profileactioncreators';

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
      selectedMenu: selectedMenu
  }
}
