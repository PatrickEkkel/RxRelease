import  * as capabilityrequests from '../requests/capabilityrequests'
import CapabilityModel from '../../models/dbmodels/capabilitymodel'


export function GET_CAPABILITY(response, properties) {


}

export function CREATE_CAPABILITY(response, properties) {
  var name = properties.name
  var context = properties.context
  var logger = properties.logger
  var newCapability = CapabilityModel.newCapability(null, name,[]);
  logger.trace("Create Capability")
  logger.traceObject(newCapability);
  return capabilityrequests.postCapability(newCapability).then(function(response) {
    logger.trace('setting Id for capability')
    logger.traceObject(response.data['id'])
    newCapability.setId(response.data['id'])
    context.addItem('selected_capability',newCapability)

  })
}
