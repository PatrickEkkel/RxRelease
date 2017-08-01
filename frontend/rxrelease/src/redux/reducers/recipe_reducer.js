var initialRecipeState = { type: 'INITIAL_RECIPE_STATE',showModal: false}

export default function _recipe(state = initialRecipeState,action) {
  console.log('_recipe reducer called with state ', state , ' and action ', action);

  switch (action.type) {

    case 'LOAD_RECIPE_FROM_CONFIGURATION':
    return {
      type: action.type,
      selected_configuration: action.selected_configuration,
      selected_profile: action.selected_profile
    }

    case 'LOAD_HOSTS_FOR_RECIPE':
    return {
      type: action.type,
      hosts: action.hosts,
      addedHost: action.addedHost
    }
    case 'SAVE_ALL_RECIPE_CHILDREN':
    return {
      type: action.type
    }
    default:
    return state;
}
}
