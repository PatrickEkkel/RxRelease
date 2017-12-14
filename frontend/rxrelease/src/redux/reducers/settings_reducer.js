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
      categories: action.categories,
      showModal: false
    }
    case 'OPEN_NEW_SETTING':
    return {
      type: action.type,
      showModal: true
    }
    case 'SAVE_NEW_SETTING':
    return {
      type: action.type,
      showModal: false
    }
    default:
    return state;

  }
}
