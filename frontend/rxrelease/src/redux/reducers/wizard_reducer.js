import ReducerLogFactory from '../../logging/ReducerLogFactory';

var initialMenuState = { type: 'INITIAL_WIZARD_STATE'}

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// from state. So it's just a personal preference here and you may not need this depending on
// how your reducers are named and what properties they expose in Redux's store.
export default function _wizard(state = initialMenuState, action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('WIZARD',state,action);
  switch (action.type) {
    case 'STORE_WIZARD_DATA_SUCCESS':
     return {
       type: action.type,
       current_item: action.current_item,
       wizard_data: action.wizard_data
     }
    case 'WAIT_FOR_LOAD':
      return {
        type: action.type
      }
    case 'LOAD_NEXT_SCREEN':
     return {
       type: action.type,
       current_item: action.current_item
    }
    case 'WAIT_FOR_SAVE':
      return {
        type: action.type
      }
    case 'STORE_WIZARD_DATA_FAILED':
     return {
       type: action.type
    }
    case 'LOAD_PREVIOUS_WIZARD_ITEM':
    return {
       type: action.type
    }
    case 'WIZARD_STATE_LOADED':
    return {
       type: action.type,
       wizard_state: action.wizard_state
    }
    case 'STORE_WIZARD_DATA':
     return {
       type: action.type,
       data: action.data,
       current_item: action.current_item
     }
    case 'PROFILE_TYPES_LOADED':
      return {
        type: action.type,
        profiletypes: action.profiletypes,
      }
    default:
      return state
  }
}
