import ReducerLogFactory from '../../../../logging/ReducerLogFactory';
var initialSettingsState = { type: 'INITIAL_SALT_STATETYPE_STATE', showModal: false }

export default function _salt_statetype_configuration(state = initialSettingsState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('SALT_STATETYPE_CONFIGURATION',state,action);
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
    case 'SALT_CONFIGURATION_LOADED':
    return {
      type: action.type,
      showModal: false,
      saltformulas: action.saltformulas
    }
    case 'UPDATE_EXISTING_STATETYPE':
    return {
      type: action.type,
      updated_statetype: action.statetype
    }
    case 'UPDATE_SELECTED_SALT_FORMULA':
    return {
      type: action.type,
      selected_saltformula: action.selected_saltformula
    }
    default:
    return state;
  }
}
