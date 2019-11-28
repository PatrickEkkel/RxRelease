import menuReducer from './reducers/menu_reducer'
import hostReducer from './reducers/host_reducer'
import profilesReducer from './reducers/profile_reducer'
import configurationReducer from './reducers/configuration_reducer'
import recipeReducer from './reducers/recipe_reducer'
import profilebreadCrumbReducer from './reducers/profilebreadcrumb_reducer'
import dockercomposeRecipeReducer from '../plugins/docker_compose/reducers/docker_compose_recipe_reducer'
import hostManagementReducer from './reducers/hostmanagement_reducer'
import toplevelReducer from './reducers/toplevel_reducer'
import hostBreadcrumbReducer from './reducers/hostbreadcrumb_reducer'
import settingsReducer from './reducers/settings_reducer'
import wizardReducer from './reducers/wizard_reducer'
import statetypeReducer from './reducers/statetype_reducer'
import yamlReducer from './reducers/yaml_editor_reducer'
import configurationpluginPanelReducer from './reducers/configurationpluginpanel_reducer'
import * as plugin_reducers from '../plugins/plugin_reducers'
import saltReducer from '../plugins/salt/redux/reducers/saltconfiguration_reducer'



export function _plugin(state,action) {
  return plugin_reducers;
}

export function _menu(state, action) {
return menuReducer(state,action)

}
/*export function _plugin_salt(state,action) {
  return saltReducer(state,action)
}*/
export function _host(state,action) {
return hostReducer(state,action)
}
export function _configuration_plugin_panel(state,action) {
  return configurationpluginPanelReducer(state,action)
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
export function _toplevel(state,action) {
  return toplevelReducer(state,action)
}
export function _dockercompose_recipe(state,action) {
  return dockercomposeRecipeReducer(state,action)
}
export function _profilebreadcrumb(state,action) {
  return profilebreadCrumbReducer(state,action)
}

export function _hostmanagement(state,action) {
  return hostManagementReducer(state,action)
}
export function _hostbreadcrumb(state,action) {
  return hostBreadcrumbReducer(state,action)
}
export function _settings(state,action) {
  return settingsReducer(state,action)
}
export function _wizard(state,action) {
  return wizardReducer(state,action)
}
export function _yamleditor(state,action) {
  return yamlReducer(state,action)
}

export function _statetypes(state,action) {
  return statetypeReducer(state,action)
}
