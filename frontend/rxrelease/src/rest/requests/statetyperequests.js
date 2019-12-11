import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function getStatetypes() {
  var backend_url = GlobalSettings.getBackendUrl()
  return Axios.get(backend_url + '/rxbackend/statetypes')
}


export function postStatetype(statetype) {
 return  Axios.post(GlobalSettings.getBackendUrl() +  '/rxbackend/statetypes/',
      {
      name: statetype.getName()
    })
}
