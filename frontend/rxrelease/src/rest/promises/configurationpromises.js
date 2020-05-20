import  * as profileconfigurationrequests from '../requests/profileconfigurationrequests'
import ConfigurationModel from '../../models/dbmodels/configurationmodel'



export function GET_CONFIGURATION(response, properties) {
  var configuration_id = properties.configuration_id
  var context = properties.context
  var logger = properties.logger
  return profileconfigurationrequests.getConfigurationById(configuration_id).then(function(response) {
    var data = response.data

    var newConfiguration = ConfigurationModel.newConfiguration(data['id'],data['name'],data['profile'],[],data['capability'])
    logger.trace('Get configuration from backend')
    logger.traceObject(newConfiguration)
    context.addItem('selected_configuration',newConfiguration)
  })
}

export function CREATE_CONFIGURATION(response, properties) {
  var configuration_name = properties.configuration_name
  var selected_profile = properties.selected_profile
  var selected_capability = properties.selected_capability
  var context = properties.context

  var configuration_model = ConfigurationModel.newConfiguration(null,configuration_name, selected_profile[0],[], selected_capability.getId() )
  return profileconfigurationrequests.postConfiguration(configuration_model).then(function(response) {
    var data = response.data
    configuration_model.setId(data['id'])
    context.addItem('selected_configuration', configuration_model)
  })
}
