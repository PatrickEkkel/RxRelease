import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialHostBreadcrumbSate = { type: 'INITIAL_HOST_BREADCRUMB_STATE', showModal: false }

export default function _hostbreadcrumb(state = initialHostBreadcrumbSate,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('HOSTBREADCRUMB',state,action);
  switch (action.type) {
    case 'INITIAL_HOST_BREADCRUMB_STATE':
    return {
      type: action.type,
    }
    case 'LOAD_HOST_MANAGEMENT_FROM_HOSTS':
    return {
      type: action.type
    }
    case 'INITIAL_HOSTS_STATE':
    return {
      type: action.type
    }
    default:
    return state;

  }
}
