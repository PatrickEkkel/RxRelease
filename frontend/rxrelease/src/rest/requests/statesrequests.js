import Axios from 'axios';
import GlobalSettings from '../../config/global'



var settings = new GlobalSettings();


export function getStatesByHost(host) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/states/search/?host_id=' + host.getId());
}

export function getHosts() {

var backend_url = settings.getBackendUrl();

}
