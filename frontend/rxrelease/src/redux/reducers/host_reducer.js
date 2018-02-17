import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialHostState = { type: 'INITIAL_HOSTS_STATE', showModal: false }

export default function _host(state = initialHostState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('HOST',state,action)
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
    case 'SAVE_NEW_HOST_FAILED':
    return {
      type: action.type,
      showModal: true,
      error_fields: action.error_fields
    }
    case 'PROFILE_TYPES_LOADED':
    return {
      type: action.type,
      showModal: true,
      profiletypes: action.profiletypes,
    }
    case 'HOSTS_LOADED':
    return {
      type: action.type,
      showModal: false,
      hosts: action.hosts
    }
    default:
    return state;

  }
}
