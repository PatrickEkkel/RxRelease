import Axios from 'axios';

import * as profileActionCreators from './profileactioncreators';


/*

TODO dit moeten we gaan opsplitsen anders wordt het een grote clusterfuck

*/

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
