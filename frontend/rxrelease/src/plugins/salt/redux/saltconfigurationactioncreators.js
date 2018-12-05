import  * as saltConfigurationRequests from '../rest/saltconfigurationrequests'
import  * as jsonUtils from '../../../lib/json/utils'
import GlobalSettings from '../../../config/global'
import LogFactory from '../../../logging/LogFactory'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'
var settings = new GlobalSettings();
var scaLogger = new LogFactory().createLogger("SALT_CONFIGURATION","ACTIONCREATOR")

export function initialConfigurationState() {

return {
  type: 'INITIAL_SALT_CONFIGURATION_STATE'
}

}
export function switchSaltformula(saltformula) {
  return {
    type: 'SELECT_SALT_FORMULA',
    selected_formula: saltformula
  }
}
export function formulaSaved(_saltformula) {
  return {
    type: 'SALT_FORMULA_SAVED',
    saltformula: _saltformula,
    showModal: false
  }
}
export function openNewFormula() {
  return {
    type: 'OPEN_NEW_SALTFORMULA',
    showModal: true
  }
}

export function updateFormula(saltformula) {

  return function (dispatch) {

    saltConfigurationRequests.putSaltFormula(saltformula)
    .then(function(response) {
        dispatch(formulaUpdated())
    })

  }

}

export function formulaUpdated() {

  return {
    type: 'SALT_FORMULA_UPDATED',
    showModal: false
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

export function loadAllSaltFormulas() {
  return function (dispatch) {

  saltConfigurationRequests.GetAllFormulas()
  .then(function(response) {

     var saltFormulas = []
     scaLogger.trace("recieved response for salt-configuration request")
     scaLogger.traceObject(response.data)
     var data = response.data
     for(var i=0;i<response.data.length;i++) {
       var newSaltFormula = SaltFormulaModel.newSaltFormula(data[i]['id'],data[i]['name'],data[i]['file'],data[i]['status'])
       scaLogger.trace("Transformed object")
       scaLogger.traceObject(newSaltFormula)
       saltFormulas.push(newSaltFormula)
     }
     dispatch(saltConfigurationLoaded(saltFormulas))
  });
}

}


export function saltConfigurationLoaded(_saltformulas) {

  return {
    type: 'SALT_CONFIGURATION_LOADED',
    saltformulas: _saltformulas
  }
}