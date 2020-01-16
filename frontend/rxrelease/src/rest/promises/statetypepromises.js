import  * as statetypeRequests from '../../rest/requests/statetyperequests'
import StateTypeModel from '../../models/dbmodels/statetypemodel'


export function GET_STATETYPE(response, properties) {
var logger = properties.loggger
var statetype_id = properties.statetype_id
var context = properties.context

// retrieve the value from the backend and put it in the property bag
  var logger = properties.logger
return  statetypeRequests.getStatetypeById(statetype_id).then(function(response) {

   var data = response.data
   logger.trace('statetype received from backend')
   logger.traceObject(data)
   context.addItem('selected_statetype',StateTypeModel.mapStateType(data))
   context.addItem('category_id', data['state_settings'])

 })
}
