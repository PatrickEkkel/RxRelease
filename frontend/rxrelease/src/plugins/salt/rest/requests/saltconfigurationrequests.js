import Axios from 'axios';
import GlobalSettings from '../../../../config/global'

var settings = new GlobalSettings();

export function getSaltFormulabyName(name) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/rxsalt/formulas/search?name=' + name);  
}

export function getSaltFormulaById(id) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/rxsalt/formulas/' + id + '/');
}


export function GetAllFormulas() {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/rxsalt/formulas/');
}

export function putSaltFormula(saltformula) {

  var backend_url = GlobalSettings.getBackendUrl();
  var files = saltformula.getFiles()
  var jsonList = []

  for (var i=0;i<files.length;i++) {
    jsonList.push(files[i].toJson())
  }

  return Axios.put(backend_url + '/rxbackend/rxsalt/formulas/' + saltformula.getId() + '/',{
    name: saltformula.getName(),
    file: saltformula.getFile(),
    status: saltformula.getStatus(),
    files: jsonList
  })
}

export function getLastSaltLogByFormulaname(saltformula) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/rxsalt/logs/latest/?name=' + saltformula.getName());
}

export function postSaltFormulaTest(saltformula) {

  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.post(backend_url + '/rxbackend/rxsalt/actions/run/',{
    action: 'state.apply',
    minion: 'salt-master',
    formula: saltformula.name,
    test: 'True'
  })

}

export function postSaltformula(saltformula) {

  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/rxsalt/formulas/',{
    name: saltformula.getName(),
    file: saltformula.getFile(),
    status: saltformula.getStatus(),
    files: []
  })
}
