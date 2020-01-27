import  * as capabilityrequests from '../requests/capabilityrequests'
import CapabilityModel from '../../models/dbmodels/capabilitymodel'


export function CREATE_CAPABILITY(response, properties) {
  var name = properties.name
  var logger = properties.logger
  var newCapability = CapabilityModel.newCapability(null, name,[]);
  logger.trace("Create Capability")
  logger.traceObject(newCapability);
  return capabilityrequests.postCapability(newCapability);
}
