import Axios from 'axios';
import GlobalSettings from '../../config/global';
import LogFactory from '../../logging/LogFactory'
import  * as sessionUtils from '../../lib/session/utils'

export function getCapabilityById(capability_id) {
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/capabilities/' + capability_id)
}

export function updateCapability() {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/capabilities/',{
    name: capability.getName(),
    statetypes: capability.getStatetypes()
  })
}

export function postCapability(capability) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/capabilities/',{
    name: capability.getName(),
    statetypes: capability.getStatetypes()
  })
}
