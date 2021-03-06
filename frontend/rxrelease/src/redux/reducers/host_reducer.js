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
      showModal: false,
      saved_host: action.saved_host
    }
    case 'SAVE_NEW_HOST_FAILED':
    return {
      type: action.type,
      showModal: true,
      error_fields: action.error_fields
    }
    case 'HOST_INSTALLED':
    return {
      type: action.type,
      installed_host: action.installed_host
    }

    case 'HOSTS_LOADED':
    return {
      type: action.type,
      showModal: false,
      hosts: action.hosts
    }
    case 'PROFILES_LOADED':
    return {
      type: action.type,
      profiles: action.profiles,
      showModal: true // action.showModal
    }
    case 'PROFILE_LOADED':
    return {
      type: action.type,
      profile: action.profile
    }
    case 'INSTALL_HOST':
    return {
      type: action.type,
      showModal: false,
      installed_host: action.installed_host
    }
    default:
    return state;

  }
}
