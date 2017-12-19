import ReducerLogFactory from '../../../logging/ReducerLogFactory'
var initialDCRecipestate = { type: 'INITIAL_DC_RECIPE_STATE',showModal: false}

export default function _dockercompose_recipe(state = initialDCRecipestate,action) {
  //console.log('_dockercompose_recipe reducer called with state ', state , ' and action ', action);
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('DOCKERCOMPOSE_RECIPE',state,action)

  switch (action.type) {


    case 'LOAD_RECIPE_FROM_CONFIGURATION':
    return {
      type: action.type,
      selected_configuration: action.selected_configuration
    }
    case 'DC_CONFIGURATION_LOADED':
    return {
      type: action.type,
      dcConfiguration: action.dcConfiguration
    }
    case 'SAVE_ALL_RECIPE_CHILDREN':
    return {
      type: action.type
    }
    case 'SAVE_DC_CONFIGURATION':
    return {
      type: action.type
    }
    default:
    return state;
  }
}
