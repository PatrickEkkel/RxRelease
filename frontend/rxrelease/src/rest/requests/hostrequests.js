import Axios from 'axios';
import GlobalSettings from '../../config/global';



export function getHostById(host_id) {
return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/hosts/' + host_id);

}

export function postHost(host) {
var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/hosts/',{
  hostname: host.getHostname(),
  ipaddress: host.getIpaddress(),
  description: host.getDescription(),
  connectioncredentials: host.getConnectionCredentials().getId()
})

}
