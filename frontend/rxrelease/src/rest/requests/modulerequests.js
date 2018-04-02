import Axios from 'axios';
import GlobalSettings from '../../config/global';

export function getEnabledModules() {
  var backend_url = GlobalSettings.getBackendUrl() + '/rxbackend/modules/'
  return Axios.get(backend_url)
}
