import Axios from 'axios';
import GlobalSettings from '../config/global'
import StateTypeModel from '../models/dbmodels/statetypemodel'
import StateType from '../models/statetype'
import PromiseExecutor from '../lib/promises/promise_executor'
import AggregatedFieldsErrorHandler from '../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as statetyperequests from '../rest/requests/statetyperequests'
import  * as statetypepromises from '../rest/promises/statetypepromises'
import  * as capabilitypromises from '../rest/promises/capabilitypromises'
import  * as settingspromises from '../rest/promises/settingspromises'
import  * as configurationpromises from '../rest/promises/configurationpromises'


import LogFactory from '../logging/LogFactory'


var settings = new GlobalSettings();
var stLogger = new LogFactory().createLogger("STATETYPES","ACTIONCREATOR")

export function initialStatetypeState() {
  return {
    type: 'INITIAL_STATETYPE_STATE'
  }
}


export function loadStatetypeManagement(entry) {

  stLogger.trace("statetype entry: ")

  stLogger.traceObject(entry)
  // convert map to Statetype
  var statetype = new StateType(entry[0],entry[1],entry[3],entry[4],entry[5])

  return {
    type: 'LOAD_STATETYPE_MANAGEMENT_FROM_STATETYPES',
    statetype: statetype
  }
}

export function statetypesLoaded(statetypes, selected_configuration) {
  return {
    type: 'STATETYPES_LOADED',
    statetypes: statetypes,
    selected_configuration: selected_configuration
  }
}

export function statetypeLoaded() {
  return {
    type: 'STATETYPE_LOADED'
  }
}

export function loadStatetype() {
  return function(dispatch) {
    dispatch(statetypeLoaded())
  }
}

export function loadStatetypes(configuration_id) {
  return function (dispatch) {
      var errorHandler = new AggregatedFieldsErrorHandler();
      var e = new PromiseExecutor();
      e.execute(configurationpromises.GET_CONFIGURATION,{ logger: stLogger, configuration_id: configuration_id})()
      .then(e.execute(statetypepromises.GET_FILTERED_STATETYPES,{ logger: stLogger, system: false }))
      .then(e.execute(function(response, properties){
        stLogger.trace('statetypes to be dispatched')
        stLogger.traceObject(properties.loaded_statetypes)
        dispatch(statetypesLoaded(properties.loaded_statetypes, properties.selected_configuration))
      }))
      .catch(function(error) {
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

export function saveNewStateType(statetype_name,statetype_jobtype,statetype_module, capability_id) {
  return function (dispatch) {

    var errorHandler = new AggregatedFieldsErrorHandler();
    var e = new PromiseExecutor();
     e.execute(settingspromises.CREATE_OR_UPDATE_SETTINGSCATEGORY,{category: statetype_name})()
    .then(e.execute(statetypepromises.CREATE_STATETYPE,{name: statetype_name, jobtype: statetype_jobtype, module: statetype_module}))
    .then(e.execute(capabilitypromises.GET_CAPABILITY,{capability_id: capability_id}))
    .then(e.execute(capabilitypromises.UPDATE_CAPABILITY,{}))
    .then(function(response) {
      dispatch( {
          type: 'SAVE_NEW_STATETYPE',
      })
    }).catch(function(error) {
      errorHandler.addErrorResponse(error)
      errorHandler.handleErrors('SAVE_NEW_STATETYPE_FAILED',dispatch)
    })
  }
}

export function updatePlugins(statetype) {
  return {
    type: 'UPDATE_STATETYPE_PLUGINS',
    statetype: statetype
  }
}

export function updateStatetype(statetype) {
  var errorHandler = new AggregatedFieldsErrorHandler();

  return function (dispatch) {
      statetyperequests.putStatetype(statetype).catch(function(error) {
        errorHandler.addErrorResponse(error)
      }).then(function() {
       if(!errorHandler.handleErrors('UPDATE_EXISTING_STATETYPE_FAILED',dispatch)) {
       dispatch({
           type: 'UPDATE_EXISTING_STATETYPE',
           updated_statetype: statetype,
       })
     }}).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('UPDATE_EXISTING_STATETYPE_FAILED',dispatch)
     });
  }
}
