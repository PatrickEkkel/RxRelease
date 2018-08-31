import ReducerLogFactory from '../../logging/ReducerLogFactory';
var initialSettingsState = { type: 'INITIAL_SETTINGS_STATE', showModal: false }

export default function _settings(state = initialSettingsState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('SETTINGS',state,action);
  switch (action.type) {
    case 'INITIAL_SETTINGS_STATE':
    return {
      type: action.type,
    }
    case 'CATEGORIES_LOADED':
    return {
      type: action.type,
      categories: action.categories,
      showModal: false
    }
    case 'OPEN_NEW_SETTING':
    return {
      type: action.type,
      showModal: true,
      categories: action.categories
    }
    case 'SAVE_NEW_SETTING':
    return {
      type: action.type,
      showModal: false
    }
    case 'LOAD_EXISTING_SETTING_CATEGORY':
    return {
      type: action.type,
      showModal: false
    }
    case 'SAVE_NEW_SETTING_CATEGORY':
    return {
      type: action.type,
      showModal: false
    }
    case 'SAVE_NEW_SETTING_CATEGORY_FAILED':
    return {
      type: action.type,
      showModal: false
    }
    case 'SAVE_NEW_SETTING_FAILED':
    return {
      type: action.type,
      error_fields: action.error_fields,
      showModal: true
    }
    default:
    return state;

  }
}
