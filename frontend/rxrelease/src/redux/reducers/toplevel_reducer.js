import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialConfigurationState = { type: 'INITIAL_APP_STATE'}

export default function _toplevel(state = initialConfigurationState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('TOPLEVEL',state,action)
  switch (action.type) {

    case 'INITIAL_APP_STATE':
      return {
        type: action.type
      }
    case 'LOAD_HOSTS_PANEL':
      return {
        type: action.type
      }
    case 'LOAD_PROFILES_PANEL':
      return {
        type: action.type
      }
    case 'AUTHENTICATION_ERROR':
      return {
        type: action.type
      }
    default:
    return state;

  }
}
