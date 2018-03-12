import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function getUsers() {
  var backend_url = GlobalSettings.getBackendUrl() + '/rxbackend/users/'
  return Axios.get(backend_url);
}

export function getLogout() {
 var backend_url = GlobalSettings.getBackendUrl() + '/accounts/logout/'
 return Axios.get(backend_url)
}
export function postLogin(username,password) {

 var bodyFormData = new FormData()
 bodyFormData.set('username',username)
 bodyFormData.set('password',password)

 const config = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
 var backend_url = GlobalSettings.getBackendUrl() + '/accounts/login/'

 return  Axios.post(backend_url,bodyFormData,config)

}
