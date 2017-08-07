var initialHostBreadcrumbSate = { type: 'INITIAL_HOST_BREADCRUMB_STATE', showModal: false }

export default function _hostbreadcrumb(state = initialHostBreadcrumbSate,action) {
  console.log('_hostmanagement reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    case 'INITIAL_HOST_BREADCRUMB_STATE':
    return {
      type: action.type,
    }
    case 'LOAD_HOST_MANAGEMENT_FROM_HOSTS':
    return {
      type: action.type 
    }
    default:
    return state;

  }
}
