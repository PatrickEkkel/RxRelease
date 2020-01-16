import ReducerLogFactory from '../../../../logging/ReducerLogFactory';
var initialSettingsState = { type: 'INITIAL_SALT_STATETYPE_STATE', showModal: false }

export default function _saltconfiguration(state = initialSettingsState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('SALT_CONFIGURATION',state,action);
  switch (action.type) {
    case 'LOAD_SALT_FORMULAS':
    return {
      type: action.type,
    }
    case 'SALT_FORMULAS_LOADED':
    return {
      type: action.type,
      saltformulas: action.saltformulas
    }
    case 'UPDATE_EXISTING_STATETYPE':
    return {
      type: action.type,
      updated_statetype: action.statetype
    }
    default:
    return state;
  }
}
