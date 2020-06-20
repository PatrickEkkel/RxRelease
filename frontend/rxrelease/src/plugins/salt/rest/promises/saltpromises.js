import SaltFormulaModel from '../../models/dbmodels/saltformulamodel'
import FileModel from '../../../../models/dbmodels/filemodel'
import  * as saltConfigurationRequests from '../../rest/requests/saltconfigurationrequests'


export function GET_SALTFORMULA_LOGS(response, properties) {

  var dispatch = properties.dispatch
  var logger = properties.logger
  var saltFormulas = response
  var configuration_loaded = properties.configuration_loaded
  /*for (var i=0;i<saltFormulas.length;i++) {
    logger.trace("Retrieve logs for saltformula")
    logger.traceObject(saltConfigurationRequests.getLastSaltLogByFormulaname(saltFormulas[i]))


  } */

  dispatch(configuration_loaded(response))
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