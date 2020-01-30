import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialConfigurationState = { type: 'INITIAL_CONFIGURATION_STATE', showModal: false}

export default function _configuration(state = initialConfigurationState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('CONFIGURATION',state,action)
  switch (action.type) {

    case 'INITIAL_CONFIGURATION_STATE':
      return {
        type: action.type,
        selected_profile: action.selected_profile
      }
    case 'OPEN_NEW_CONFIGURATION':
    return {
        type: action.type,
        showModal: true,
        configurations: action.configurations
    }
    case 'SAVE_NEW_CONFIGURATION':
    return {
      type: action.type,
      showModal: false,
      selected_capability: action.selected_capability,
      configurations: action.configurations
    }
    case 'CONFIGURATION_LOADING':
    return {
      type: action.type,
      showModal: false
    }
    case 'CONFIGURATION_LOADED':
    return {
      type: action.type,
      showModal: false,
      configurations: action.configurations
    }
    case 'CONFIGURATION_COMPLETE':
      return  {
        type: action.type,
        showModal: false,
      }

    case 'LOAD_CONFIGURATION_FROM_PROFILES':
    return {
      type: action.type,
      selected_profile: action.selected_profile,
      showModal: false
    }
    default:
    return state;

  }
}
