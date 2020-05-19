  import ProfileModel from '../../models/dbmodels/profilemodel'
import  * as profileRequests from '../../rest/requests/profilerequests'



export function UPDATE_PROFILE_BY_ID(response,properties) {
 var logger = properties.logger
 var selected_profile = properties.selected_profile
 var selected_configuration = properties.selected_configuration
 selected_profile.default_configuration = selected_configuration
 logger.trace('selected_profile')
 logger.traceObject(selected_profile)
 return profileRequests.putProfile(selected_profile)

}

export function GET_PROFILE_BY_ID(response, properties) {
  var logger = properties.logger
  var host = properties.current_host
  var context = properties.context

  return profileRequests.getProfilebyId()
}

export function GET_PROFILE_BY_HOST(response, properties) {
  var logger = properties.logger
  var host = properties.current_host
  var context = properties.context
  return profileRequests.getProfilebyHostId(host).then(function(r) {
    var data = r.data[0]
    var profilemodel = ProfileModel.newProfile(data['id'], data['name'])
    logger.trace("profilemodel by host")
    logger.traceObject(profilemodel)
    context.addItem('selected_profile',profilemodel)
    return r
  })
}
