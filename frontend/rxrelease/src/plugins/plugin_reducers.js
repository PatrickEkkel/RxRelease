import saltReducer from './salt/redux/reducers/saltwizard_reducer'
import saltConfigurationReducer from './salt/redux/reducers/saltconfiguration_reducer'

export function _saltwizard(state, action) {
  return saltReducer(state,action)
}

export function _saltconfiguration(state,action) {
  return saltConfigurationReducer(state,action)
}
