var initialRecipeState = { type: 'INITIAL_RECIPE_STATE',showModal: false}

export default function _recipe(state = initialRecipeState,action) {
  console.log('_recipe reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    default:
    return state;
  }
}
