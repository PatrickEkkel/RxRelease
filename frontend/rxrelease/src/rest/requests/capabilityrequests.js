import Axios from 'axios';
import GlobalSettings from '../../config/global';
import LogFactory from '../../logging/LogFactory'
import  * as sessionUtils from '../../lib/session/utils'

export function getCapability() {
  
}

export function postCapability(capability) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/capabilities/',{
    name: capability.getName(),
    statetypes: capability.getStatetypes()
  })
}
