var initialHostManagementState = { type: 'INITIAL_HOST_MANAGEMENT_STATE', showModal: false }

export default function _hostmanagement(state = initialHostManagementState,action) {
  console.log('_hostmanagement reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    case 'LOAD_HOST_MANAGEMENT_FROM_HOSTS':
    return {
      type: action.type,
      selected_host: action.selected_host
    }
    default:
    return state;

  }
}
