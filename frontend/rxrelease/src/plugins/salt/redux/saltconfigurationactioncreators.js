import  * as saltConfigurationRequests from '../rest/requests/saltconfigurationrequests'
import  * as settingsRequests from '../../../rest/requests/settingsrequests'
import  * as statetypeRequests from '../../../rest/requests/statetyperequests'
import  * as fileRequests from '../../../rest/requests/filerequests'
import  * as jsonUtils from '../../../lib/json/utils'
import  * as saltpromises from '../../../plugins/salt/rest/promises/saltpromises'
import  * as statetypepromises from '../../../rest/promises/statetypepromises'
import  * as settingspromises from '../../../rest/promises/settingspromises'
import GlobalSettings from '../../../config/global'
import LogFactory from '../../../logging/LogFactory'
import PromiseExecutor from '../../../lib/promises/promise_executor'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'
import SaltLogModel from '../models/dbmodels/saltlogmodel';

import FileModel from '../../../models/dbmodels/filemodel'
var settings = new GlobalSettings();
var scaLogger = new LogFactory().createLogger("SALT_CONFIGURATION","ACTIONCREATOR")

export function initialConfigurationState() {

return {
  type: 'INITIAL_SALT_CONFIGURATION_STATE',
  showModal: false
}

}
export function switchSaltformula(saltformula) {
  scaLogger.trace("selected saltformula: ")
  scaLogger.traceObject(saltformula)

  return loadSaltformulaLogs(saltformula)
}
export function formulaSaved(_saltformula) {
  return {
    type: 'SALT_FORMULA_SAVED',
    saltformula: _saltformula,
    showModal: false
  }
}
export function openNewFile() {
  return {
    type: 'OPEN_NEW_SALTFILE',
    showModal: true
  }
}

export function openNewFormula() {
  return {
    type: 'OPEN_NEW_SALTFORMULA',
    showModal: true
  }
}
// TODO: opdelen in promises
export function testSaltFormula(saltformula) {

return function(dispatch) {
  saltConfigurationRequests.postSaltFormulaTest(saltformula)
  .then(function(response) {
    return response.data
  }).then(function(response)
  {
    dispatch(formulaTested())
  })
}
}


export function formulaTested() {
  return {
    type: 'FORMULA_TESTED'

  }
}


export function updateDone(selected_statetype) {
  return {
    type: 'UPDATE_STATETYPE_DONE',
    statetype: selected_statetype,
    updated_plugin: 'rxsalt'
  }
}

export function loadCoupledSaltFormula(selected_statetype) {
  scaLogger.trace('get coupled salt formula')
  scaLogger.traceObject(selected_statetype)
  var e = new PromiseExecutor();

  return function(dispatch) {
    e.execute(statetypepromises.GET_STATETYPE, {logger: scaLogger,statetype_id: selected_statetype.id})()
    .then(e.execute(settingspromises.GET_SETTING,{logger: scaLogger,key: 'salt-formula'}))
    .then(e.execute(saltpromises.GET_SALTFORMULA,{logger: scaLogger, saltformula_name: 'PostgreSQL'}))
    .then(function(response) {
      dispatch(updateSelectedSaltFormula(e.stored_state.selected_saltformula))
    })

  }
}

export function updateSelectedSaltFormula(selected_saltformula) {
  return {
    type: 'UPDATE_SELECTED_SALT_FORMULA',
    selected_saltformula: selected_saltformula

  }
}

export function coupleFormulaToStatetype(saltformula_id, statetype_id) {
  scaLogger.trace('Couple selected saltformula to statetype')
  scaLogger.trace('saltformula id: ' + saltformula_id)
  scaLogger.trace('statetype id: ' + statetype_id)


  // first materialize the ids
  var e = new PromiseExecutor()
  return function(dispatch) {

     e.execute(statetypepromises.GET_STATETYPE,{logger: scaLogger, statetype_id: statetype_id})()
    .then(e.execute(saltpromises.GET_SALTFORMULA,{ logger: scaLogger, saltformula_id: saltformula_id }))
    //.then(e.execute(settingspromises.GET_CATEGORY_BY_ID,{logger: scaLogger}))
    .then(e.execute(settingspromises.GET_OR_CREATE_SETTING,
      {logger: scaLogger,key: 'salt-formula',value_store: 'salt_formula_name'}))
    .then(e.execute(settingspromises.UPDATE_SETTING,{logger: scaLogger, key: 'salt-formula', value_store: 'salt_formula_name'}))
    .then(function(response) {
      dispatch(updateDone(e.stored_state.selected_statetype))
    })
  }

}

export function updateFormula(saltformula) {
  scaLogger.trace('updated salt formula')
  scaLogger.traceObject(saltformula)


  return function (dispatch) {
    saltConfigurationRequests.putSaltFormula(saltformula)
    .then(function(response) {
        var data = response.data
        var files = response.data['files']
        var updatedSaltFormula = SaltFormulaModel.newSaltFormula(data['id'],data['name'],data['file'],data['status'])
        for(var i=0;i<files.length;i++) {
          var currentFile = files[i]
          var updatedFile = FileModel.newFile(currentFile['id'],currentFile['filename'],currentFile['path'])
          updatedSaltFormula.addFile(updatedFile)
        }
        scaLogger.trace("salt formula updated")
        scaLogger.traceObject(response)
        dispatch(formulaUpdated(updatedSaltFormula))
    })
  }

}

export function formulaUpdated(updated_formula) {

  return {
    type: 'SALT_FORMULA_UPDATED',
    showModal: false,
    updated_formula: updated_formula
  }
}

export function saveNewFile(file,saltformula) {

  return function (dispatch) {
        dispatch(fileSaved(file,saltformula))
  }
}
export function fileSaved(file,saltformula) {
  return {
    type: 'SALT_FILE_SAVED',
    showModal: false,
    selected_formula: saltformula,
    file: file
  }
}
export function saveNewFormula(saltformula) {

  return function (dispatch) {

    saltConfigurationRequests.postSaltformula(saltformula)
    .then(function(response) {
        dispatch(formulaSaved())
    })

  }
}

export function loadSaltformulaLogs(saltformula) {
  return function(dispatch) {
    saltConfigurationRequests.getLastSaltLogByFormulaname(saltformula).then(function(response) {

      var data = response.data

      for(var i=0;i<data.length;i++) {

        saltformula.addSaltLog(SaltLogModel.newSaltLogModel(data[i]['id'],
        data[i]['minion'],
        data[i]['saltstate'],
        data[i]['duration'],
        data[i]['comment'],
        data[i]['start_date'],
        data[i]['start_time'],
        data[i]['run_num'],
        data[i]['changes'],
        data[i]['sls'],
        data[i]['result'],
        data[i]['test'],
        data[i]['type']))
      }

      dispatch(selectSaltFormula(saltformula))
    }).catch(function(err) {
      scaLogger.debug("loadSaltformulaLogs: " + err)
    })
  }
}

export function selectSaltFormula(saltformula) {

  return {
    type: 'SELECT_SALT_FORMULA',
    selected_formula: saltformula
  }

}

export function loadAllSaltFormulas() {
  return function (dispatch) {
      var e = new PromiseExecutor()
      try {
   saltpromises.GET_SALTFORMULAS(null,{logger: scaLogger})
  .then(e.execute(saltpromises.CREATE_SALTFORMULA_OBJECTS, {logger: scaLogger}))
  .then(e.execute(saltpromises.GET_SALTFORMULA_LOGS, { logger: scaLogger,
     dispatch: dispatch,
     configuration_loaded: saltConfigurationLoaded}));
  }
  catch(err) {
    console.log(err)
  }
}

}


export function saltConfigurationLoaded(_saltformulas) {

  return {
    type: 'SALT_CONFIGURATION_LOADED',
    saltformulas: _saltformulas,
  }
}
