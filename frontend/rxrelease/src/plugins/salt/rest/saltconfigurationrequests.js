import Axios from 'axios';
import GlobalSettings from '../../../config/global'

var settings = new GlobalSettings();


export function GetAllFormulas() {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/rxsalt/formulas/');
}

export function putSaltFormula(saltformula) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.put(backend_url + '/rxbackend/rxsalt/formulas/' + saltformula.getId() + '/',{
    name: saltformula.getName(),
    file: saltformula.getFile(),
    status: saltformula.getStatus()
  })

}

export function postSaltformula(saltformula) {

  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/rxsalt/formulas/',{
    name: saltformula.getName(),
    file: saltformula.getFile(),
    status: saltformula.getStatus()
  })
}
