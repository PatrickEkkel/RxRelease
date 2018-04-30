import ReducerLogFactory from '../../logging/ReducerLogFactory';

var initialMenuState = { type: 'INITIAL_WIZARD_STATE'}

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// from state. So it's just a personal preference here and you may not need this depending on
// how your reducers are named and what properties they expose in Redux's store.
export default function _wizard(state = initialMenuState, action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('WIZARD',state,action);
  switch (action.type) {
    case 'LOAD_NEXT_WIZARD_ITEM':
      return {
        type: 'LOAD_NEXT_WIZARD_ITEM',
      }
    case 'LOAD_PREVIOUS_WIZARD_ITEM':
    return {
        type: 'LOAD_PREVIOUS_WIZARD_ITEM',
    }
    case 'STORE_WIZARD_DATA':
    return {
      type: 'STORE_WIZARD_DATA',
      data: action.data
    }
    default:
      return state
  }
}
