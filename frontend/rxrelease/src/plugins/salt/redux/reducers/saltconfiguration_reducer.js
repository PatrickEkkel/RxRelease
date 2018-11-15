import ReducerLogFactory from '../../../../logging/ReducerLogFactory';
var initialSettingsState = { type: 'INITIAL_SALT_CONFIGURATION_STATE', showModal: false }

export default function _saltconfiguration(state = initialSettingsState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('SALT_CONFIGURATION',state,action);
  switch (action.type) {
    case 'INITIAL_SALT_CONFIGURATION_STATE':
    return {
      type: action.type,
      showModal: false
    }
    case 'SALT_CONFIGURATION_LOADED':
    return {
      type: action.type,
      showModal: false,
      saltformulas: action.saltformulas
    }
    case 'SELECT_SALT_FORMULA':
     return {
       type: action.type,
       showModal: false,
       selected_formula: action.selected_formula
     }
    default:
    return state;
  }
}
