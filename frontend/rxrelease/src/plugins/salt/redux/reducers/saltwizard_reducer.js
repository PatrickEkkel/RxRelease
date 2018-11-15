import ReducerLogFactory from '../../../../logging/ReducerLogFactory'

var initialConfigurationState = { type: 'INITIAL_CONFIGURATION_STATE', showModal: false}

export default function _saltwizard(state = initialConfigurationState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('CONFIGURATION',state,action)
  switch (action.type) {

    case 'INITIAL_SALT_WIZARD_STATE':
      return {
        type: action.type,
        selected_profile: action.selected_profile
      }
    default:
    return state;
  }
}
