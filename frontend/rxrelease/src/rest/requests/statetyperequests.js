import Axios from 'axios';
import GlobalSettings from '../../config/global';
import  * as jsonUtils from '../../lib/json/utils'


export function getFilteredStatetypes(system) {
  var backend_url = GlobalSettings.getBackendUrl()

  return Axios.get(backend_url + '/rxbackend/statetypes/search/?system=' + jsonUtils.convertToPythonBool(system))

}

export function getStatetypes() {
  var backend_url = GlobalSettings.getBackendUrl()
  return Axios.get(backend_url + '/rxbackend/statetypes')
}

export function getStatetypeById(id) {
  var backend_url = GlobalSettings.getBackendUrl()
  return Axios.get(backend_url + '/rxbackend/statetypes/' + id + '/')

}

export function putStatetype(statetype) {
  var backend_url = GlobalSettings.getBackendUrl() + '/rxbackend/statetypes/' + statetype.getId() + "/";
  return Axios.put(backend_url,{
   name: statetype.getName(),
   jobtype: statetype.getJobtype(),
   module: statetype.getModule()
 });

}


export function postStatetype(statetype) {
 return  Axios.post(GlobalSettings.getBackendUrl() +  '/rxbackend/statetypes/',
      {
      name: statetype.getName(),
      jobtype: statetype.getJobtype(),
      module: statetype.getModule(),
      state_settings: statetype.getStateSettings().getId()

    })
}
