import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function postProfile(profile) {
 return  Axios.post(GlobalSettings.getBackendUrl() +  '/rxbackend/profiles/',
      {
      name: profile.getName(),
    })
}

export function getProfilebyName(name) {
  return Axios.get( GlobalSettings.getBackendUrl() + '/rxbackend/profiles/search/?name=' + name);
}

export function getProfiles() {
  return Axios.get( GlobalSettings.getBackendUrl() + '/rxbackend/profiles/');
}
