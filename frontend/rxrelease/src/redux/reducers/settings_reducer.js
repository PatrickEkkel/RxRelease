var initialSettingsState = { type: 'INITIAL_SETTINGS_STATE', showModal: false }

export default function _settings(state = initialSettingsState,action) {
  console.log('_settings reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    case 'INITIAL_SETTINGS_STATE':
    return {
      type: action.type,
    }
    case 'LOAD_CATEGORIES':
    return {
      type: action.type,
      categories: action.categories 
    }
    default:
    return state;

  }
}
