import Axios from 'axios';
import GlobalSettings from '../../config/global';


var settings = new GlobalSettings();

export function postHost(host) {
var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/hosts/',{
  hostname: host.getHostname(),
  ipaddress: host.getIpaddress(),
  description: host.getDescription(),
  connectioncredentials: host.getConnectionCredentials().getId()
})

}
