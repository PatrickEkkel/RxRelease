import  * as statetypeRequests from '../../rest/requests/statetyperequests'
import StateTypeModel from '../../models/dbmodels/statetypemodel'

export function CREATE_STATETYPE(response, properties) {
  var statetype_name = properties.name
  var statetype_jobtype = properties.jobtype
  var statetype_module = properties.module
  var settings_category = properties.settings_category
  var logger = properties.logger

  var statetype = StateTypeModel.newStateType(null, statetype_name, null, statetype_module, null, null, statetype_jobtype)
  logger.trace("post new statetype")
  logger.traceObject(statetype)
  statetype.setStateSettings(settings_category)
  return statetypeRequests.postStatetype(statetype);

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
