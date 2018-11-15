import Axios from 'axios';
import GlobalSettings from '../../../config/global'

var settings = new GlobalSettings();


export function GetAllFormulas() {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/rxsalt/formulas/');
}
