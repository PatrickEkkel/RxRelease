import  * as statetypeRequests from '../../rest/requests/statetyperequests'
import StateType from '../../models/statetype'

import StateTypeModel from '../../models/dbmodels/statetypemodel'

export function CREATE_STATETYPE(response, properties) {
  var statetype_name = properties.name
  var statetype_jobtype = properties.jobtype
  var statetype_module = properties.module
  var settings_category = properties.settings_category
  var logger = properties.logger
  var context = properties.context

  var statetype = StateTypeModel.newStateType(null, statetype_name, null, statetype_module, null, null, statetype_jobtype)
  logger.trace("post new statetype")
  logger.traceObject(statetype)
  statetype.setStateSettings(settings_category)
  return statetypeRequests.postStatetype(statetype).then(function(response) {
    var data = response.data
    statetype.setId(data['id'])
    context.addItem('selected_statetype',statetype)
  })

}

export function GET_FILTERED_STATETYPES(response, properties) {
  var logger = properties.logger
  var context = properties.context
  var selected_configuration = properties.selected_configuration
  logger.trace('loading statetypes from configuration')
  logger.traceObject(selected_configuration)
  return statetypeRequests.getFilteredStatetypes(false,selected_configuration.getCapabilityId())
  .then(function(response){
    var statetypes = []
    var data = response.data
    for(var i=0;i<data.length;i++) {
      var statetype = data[i]
      var newStateType = new StateType(statetype.id,
        statetype.name,
        statetype.module,
        statetype.handler,
        statetype.jobtype,
        statetype.system)
      logger.trace('statetype:')
      logger.traceObject(newStateType)

      statetypes.push(newStateType)
    }
    context.addItem('loaded_statetypes',statetypes)
    logger.trace('send statetypes')
    logger.traceObject(statetypes)
  })
}

export function GET_STATETYPE(response, properties) {
var logger = properties.logger
var statetype_id = properties.statetype_id
var context = properties.context


return  statetypeRequests.getStatetypeById(statetype_id).then(function(response) {

   var data = response.data
   var logger = properties.logger
   logger.trace('statetype received from backend')
   logger.traceObject(data)
   context.addItem('selected_statetype',StateTypeModel.mapStateType(data))
   context.addItem('category_id', data['state_settings'])

 })
}
