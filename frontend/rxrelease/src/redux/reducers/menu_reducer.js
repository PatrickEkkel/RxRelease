var initialMenuState = { type: 'INITIAL_SELECTED_MENU', selectedMenu: 'Profiles'}

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// from state. So it's just a personal preference here and you may not need this depending on
// how your reducers are named and what properties they expose in Redux's store.
export default function _menu(state = initialMenuState, action) {
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