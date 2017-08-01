var initialProfileBreadcrumbState = { type: 'INITIAL_PROFILE_BREADCRUMBSTATE', showModal: false }

export default function _host(state = initialProfileBreadcrumbState,action) {
  console.log('_profilebreadcrumb reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    case 'INITIAL_PROFILE_BREADCRUMBSTATE':
    return {
      type: action.type,
      showModal: false
    }
     case 'INITIAL_PROFILES_STATE':
     return {
       type: action.type
     }
     case 'INITIAL_CONFIGURATION_STATE':
     return {
       type: action.type,
       selected_profile: action.selected_profile
      }
     case 'LOAD_CONFIGURATION_FROM_PROFILES':
     return  {
       type: action.type,
       selected_profile: action.selected_profile
     }
     case 'LOAD_RECIPE_FROM_CONFIGURATION':
     return  {
       type: action.type
     }
    default:
    return state;

  }
}
