import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialHostState = { type: 'INITIAL_STATETYPE_STATE', showModal: false }

export default function _statetype(state = initialHostState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('STATETYPE',state,action)
  switch (action.type) {

    case 'INITIAL_STATETYPE_STATE':
    return {
      type: action.type,
      showModal: false
    }
    case 'UPDATE_EXISTING_STATETYPE':
    return {
      type: action.type,
      updated_statetype: action.statetype
    }
    case 'UPDATE_EXISTING_STATETYPE_FAILED':
    return {
      type: action.type,
      updated_statetype: action.statetype
    }
    case 'OPEN_NEW_STATETYPE':
    return {
      type: action.type,
      showModal: true
    }
    case 'SAVE_NEW_STATETYPE':
    return {
      type: action.type,
      showModal: false
    }
    case 'SAVE_NEW_STATETYPE_FAILED':
    return {
      type: action.type,
      showModal: true
    }
    case 'STATETYPES_LOADED':
    return {
      type: action.type,
      statetypes: action.statetypes
    }
    case 'LOAD_STATETYPE_MANAGEMENT_FROM_STATETYPES':
    return {
      type: action.type,
      statetype: action.statetype,
    }
    default:
    return state;

  }
}
