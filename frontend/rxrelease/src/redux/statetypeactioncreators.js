import Axios from 'axios';
import GlobalSettings from '../config/global'
import StateTypeModel from '../models/dbmodels/statetypemodel'
import StateType from '../models/statetype'
import AggregatedFieldsErrorHandler from '../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as statetyperequests from '../rest/requests/statetyperequests'
import LogFactory from '../logging/LogFactory'


var settings = new GlobalSettings();
var stLogger = new LogFactory().createLogger("STATETYPES","ACTIONCREATOR")


export function initialStatetypeState() {
  return {
    type: 'INITIAL_STATETYPE_STATE'
  }
}
export function statetypesLoaded(statetypes) {
  return {
    type: 'STATETYPES_LOADED',
    statetypes: statetypes
  }
}
export function loadStatetypes() {

  return function (dispatch) {
      var errorHandler = new AggregatedFieldsErrorHandler();
      statetyperequests.getStatetypes()
      .then(function(response){
        var statetypes = []
        var data = response.data
        for(var i=0;i<data.length;i++) {
          var statetype = data[i]
          var newStateType = new StateType(statetype.id,
            statetype.name,
            statetype.module,
            statetype.handler,
            statetype.jobtype)
          stLogger.trace('statetype:')
          stLogger.traceObject(newStateType)
          statetypes.push(newStateType)
        }
        stLogger.trace('send statetypes')
        stLogger.traceObject(statetypes)
        dispatch(statetypesLoaded(statetypes))
      }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('GET_STATETYPES_FAILED',dispatch)
      })
  }
}

export function openNewStateType(hostentry) {

  return {
    type: 'OPEN_NEW_STATETYPE'
    }
}

export function saveNewStateType(statetype_name,statetype_jobtype,statetype_module) {
  return function (dispatch) {

    var errorHandler = new AggregatedFieldsErrorHandler();
    var statetype = StateTypeModel.newStateType(statetype_name, statetype_jobtype)

    statetyperequests.postStatetype(statetype).then(function() {
        dispatch( {
            type: 'SAVE_NEW_STATETYPE',
        })
      }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_STATETYPE_FAILED',dispatch)
      });

  }
}
