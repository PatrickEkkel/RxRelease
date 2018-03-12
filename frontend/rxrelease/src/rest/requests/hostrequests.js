import Axios from 'axios';
import GlobalSettings from '../../config/global';
import LogFactory from '../../logging/LogFactory'
import  * as sessionUtils from '../../lib/session/utils'

var settings = new GlobalSettings();
var hrLogger = new LogFactory().createLogger("HOSTS","REQUESTS")

export function getHostById(host_id) {
return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/hosts/' + host_id);

}

export function putHost(host) {

  var backend_url = GlobalSettings.getBackendUrl() + '/rxbackend/hosts/' + host.getId() + "/";
  return Axios.put(backend_url,
 {
   hostname: host.getHostname(),
   ipaddress: host.getIpaddress(),
   description: host.getDescription()
 })

}

export function postHost(host) {
var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/hosts/',{
  hostname: host.getHostname(),
  ipaddress: host.getIpaddress(),
  description: host.getDescription(),
  profileType: host.getProfileType(),
  connectioncredentials: host.getConnectionCredentials().getId()
})

}
