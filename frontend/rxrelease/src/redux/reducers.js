import menuReducer from './reducers/menu_reducer'
import hostReducer from './reducers/host_reducer'
import profilesReducer from './reducers/profile_reducer'
import configurationReducer from './reducers/configuration_reducer'
import recipeReducer from './reducers/recipe_reducer'
import profilebreadCrumbReducer from './reducers/profilebreadcrumb_reducer'
import dockercomposeRecipeReducer from '../plugins/docker_compose/reducers/docker_compose_recipe_reducer'

export function _menu(state, action) {
return menuReducer(state,action)

}
export function _host(state,action) {
return hostReducer(state,action)
}
export function _profiles(state,action) {
  return profilesReducer(state,action)
}
export function _configuration(state,action) {
  return configurationReducer(state,action)
}
export function _recipe(state,action) {
  return recipeReducer(state,action)
}
export function _dockercompose_recipe(state,action) {
  return dockercomposeRecipeReducer(state,action)
}
export function _profilebreadcrumb(state,action) {
  return profilebreadCrumbReducer(state,action)
}
