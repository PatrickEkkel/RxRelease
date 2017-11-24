var initialHostManagementState = { type: 'INITIAL_HOST_MANAGEMENT_STATE', showModal: false }

export default function _hostmanagement(state = initialHostManagementState,action) {
  console.log('_hostmanagement reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    case 'LOAD_HOST_MANAGEMENT_FROM_HOSTS':
    return {
      type: action.type,
      selected_host: action.selected_host
    }
    case 'UPDATE_EXISTING_HOST':
    return {
      type: action.type,
      selected_host: action.selected_host
    }
    case 'EXISTING_HOST_UPDATED':
    return {
      type: action.type,
      selected_host: action.selected_host
    }
    case 'UPDATE_EXISTING_HOST_FAILED':
    return {
      type: action.type,
      error_fields: action.error_fields
    }
    default:
    return state;

  }
}
