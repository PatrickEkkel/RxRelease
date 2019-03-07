import  * as saltConfigurationRequests from '../rest/saltconfigurationrequests'
import  * as fileRequests from '../../../rest/requests/filerequests'
import  * as jsonUtils from '../../../lib/json/utils'
import GlobalSettings from '../../../config/global'
import LogFactory from '../../../logging/LogFactory'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'
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

export function getFileContents(file) {

  return function(dispatch) {

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

export function loadAllSaltFormulas() {
  return function (dispatch) {

  saltConfigurationRequests.GetAllFormulas()
  .then(function(response) {

     var saltFormulas = []
     scaLogger.trace("recieved response for salt-configuration request")
     scaLogger.traceObject(response.data)
     var data = response.data
     for (var i=0;i<response.data.length;i++) {
       var dataElement = data[i]
       var files  = dataElement['files']


       var newSaltFormula = SaltFormulaModel.newSaltFormula(dataElement['id'],dataElement['name'],dataElement['file'],dataElement['status'])
       for (var a=0;a<files.length;a++) {
            var fileDataElement = files[a]
            var newFile =  FileModel.newFile(fileDataElement['id'], fileDataElement['filename'],fileDataElement['path'])
            newSaltFormula.addFile(newFile)
        }
       saltFormulas.push(newSaltFormula)
     }
     scaLogger.trace('loaded saltformulas')
     scaLogger.traceObject(saltFormulas)
     dispatch(saltConfigurationLoaded(saltFormulas))
  });
}

}


export function saltConfigurationLoaded(_saltformulas) {

  return {
    type: 'SALT_CONFIGURATION_LOADED',
    saltformulas: _saltformulas,
  }
}
