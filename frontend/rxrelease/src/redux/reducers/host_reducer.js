var initialHostState = { type: 'INITIAL_HOSTS_STATE', showModal: false }

export default function _host(state = initialHostState,action) {
  console.log('_host reducer called with state ', state , ' and action ', action);
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
