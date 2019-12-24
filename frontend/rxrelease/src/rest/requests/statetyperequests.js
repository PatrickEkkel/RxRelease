import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function getStatetypes() {
  var backend_url = GlobalSettings.getBackendUrl()
  return Axios.get(backend_url + '/rxbackend/statetypes')
}

export function putStatetype(statetype) {
  var backend_url = GlobalSettings.getBackendUrl() + '/rxbackend/statetypes/' + statetype.getId() + "/";
  return Axios.put(backend_url,{
   name: statetype.getName(),
 });

}


export function postStatetype(statetype) {
 return  Axios.post(GlobalSettings.getBackendUrl() +  '/rxbackend/statetypes/',
      {
      name: statetype.getName()
    })
}
