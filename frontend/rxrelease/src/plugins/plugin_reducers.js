import saltReducer from './salt/wizard/redux/reducers/saltwizard_reducer'

export function _saltwizard(state, action) {
  return saltReducer(state,action)
}
