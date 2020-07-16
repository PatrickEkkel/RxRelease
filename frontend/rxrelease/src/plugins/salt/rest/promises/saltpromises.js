import SaltFormulaModel from '../../models/dbmodels/saltformulamodel'
import FileModel from '../../../../models/dbmodels/filemodel'
import  * as saltConfigurationRequests from '../../rest/requests/saltconfigurationrequests'
import  * as jsonUtils from '../../../../lib/json/utils'


export function GET_SALTFORMULA_LOGS(response, properties) {

  var dispatch = properties.dispatch
  var logger = properties.logger
  var saltFormulas = response
  var configuration_loaded = properties.configuration_loaded
  dispatch(configuration_loaded(response))
}


export function GET_SALTFORMULA(response, properties) {
  var logger = properties.logger
  var saltformula_id = properties.saltformula_id
  var saltformula_name = properties.saltformula_name
  var context = properties.context
  var value = null;
  var get_request = null;

  if(typeof saltformula_id !== 'undefined') {
    get_request = saltConfigurationRequests.getSaltFormulaById
    value = saltformula_id
  }
  else if (typeof saltformula_name !== 'undefined') {
    get_request = saltConfigurationRequests.getSaltFormulabyName
    value = saltformula_name

  }

  return get_request(value).then(
    function(response) {

      var data = response.data
      logger.trace('recieved Saltformula')
      var saltformula = jsonUtils.normalizeJson(response.data)
      logger.traceObject(data)
       // put the saltformula in the value field for the next promise
       var mapped_saltformula = SaltFormulaModel.mapSaltFormula(saltformula)
       context.addItem('salt_formula_name',mapped_saltformula.getName())
       context.addItem('selected_saltformula',mapped_saltformula)
    }
  )
}

export function GET_SALTFORMULAS(response, properties) {
  var logger = properties.logger

   return saltConfigurationRequests.GetAllFormulas()
}

export function CREATE_SALTFORMULA_OBJECTS(response, properties) {
      var saltFormulas = []
      var logger = properties.logger
     logger.trace("recieved response for salt-configuration request")
     logger.traceObject(response.data)
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
     logger.trace('loaded saltformulas')
     logger.traceObject(saltFormulas)
     return saltFormulas
}
