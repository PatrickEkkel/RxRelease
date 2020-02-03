import  * as capabilityrequests from '../requests/capabilityrequests'
import CapabilityModel from '../../models/dbmodels/capabilitymodel'
import StateTypeModel from '../../models/dbmodels/statetypemodel'

export function GET_CAPABILITY(response, properties) {

  var capability_id = properties.capability_id;
  var context = properties.context;
  return capabilityrequests.getCapabilityById(capability_id).then(function(response) {

    var data = response.data
    var newStatetypes = []
    for (var i=0;i<data['statetypes'].length;i++) {
     newStatetypes.push(StateTypeModel.newStateType(data['statetypes'][i]));
    }
    var newCapability = CapabilityModel.newCapability(data['id'],data['name'],newStatetypes)
    context.addItem('selected_capability',newCapability)
  })

}

export function UPDATE_CAPABILITY(response, properties) {
 // TODO hier was ik gebleven
 var selected_capability = properties.selected_capability;
 var selected_statetype = properties.selected_statetype;
 var logger = properties.logger;

 logger.trace('Capability to update');
 logger.traceObject(selected_capability)
 selected_capability.addStatetype(selected_statetype)
 capabilityrequests.putCapability(selected_capability)
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
