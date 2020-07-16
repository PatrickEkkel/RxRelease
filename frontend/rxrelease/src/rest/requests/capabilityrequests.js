import Axios from 'axios';
import GlobalSettings from '../../config/global';
import LogFactory from '../../logging/LogFactory'
import  * as sessionUtils from '../../lib/session/utils'
import  StandardListConverters from '../../converters/StandardListConverters'

export function getCapabilityById(capability_id) {
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/capabilities/' + capability_id)
}

export function putCapability(capability) {
  var backend_url = GlobalSettings.getBackendUrl();
  var statetype_pks = StandardListConverters.convertObjectListToPk(capability.getStatetypes());
  return Axios.put(backend_url + '/rxbackend/capabilities/' + capability.getId() + '/',{
    name: capability.getName(),
    statetypes: statetype_pks
  })
}

export function postCapability(capability) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/capabilities/',{
    name: capability.getName(),
    statetypes: capability.getStatetypes()
  })
}
