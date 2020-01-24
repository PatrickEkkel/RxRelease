import  * as profileconfigurationrequests from '../requests/profileconfigurationrequests'


export function CREATE_CONFIGURATION(response, properties) {
  var configuration_name = properties.configuration_name
  var selected_profile = properties.selected_profile

  return profileconfigurationrequests.postConfiguration(configuration_name, selected_profile)
}
