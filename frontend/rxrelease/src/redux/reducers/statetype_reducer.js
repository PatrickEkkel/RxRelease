import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialHostState = { type: 'INITIAL_STATETYPE_STATE', showModal: false }

export default function _statetype(state = initialHostState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('STATETYPE',state,action)
  switch (action.type) {
    case 'OPEN_NEW_STATETYPE':
    return {
      type: action.type,
      showModal: true
    }

    default:
    return state;

  }
}
