import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function putProfile(profile) {
  return Axios.put(GlobalSettings.getBackendUrl() + '/rxbackend/profiles/' + profile.getId() + '/',
    {
      name: profile.getName(),
      inherited: profile.getInherited().getId(),
      default_configuration: profile.getDefaultConfiguration().getId()

    }
  )
}


export function postProfile(profile) {
 return  Axios.post(GlobalSettings.getBackendUrl() +  '/rxbackend/profiles/',
      {
      name: profile.getName(),
      inherited: profile.getInherited().getId()
    })
}
export function getProfilebyHostId(host) {
  return Axios.get( GlobalSettings.getBackendUrl() + '/rxbackend/profiles/search/?host_id=' + host.getId());
}

export function getProfilebyId(id) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/profiles/' + id)
}

export function getProfilebyName(name) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/profiles/search/?name=' + name);
}

export function getProfiles() {
  return Axios.get( GlobalSettings.getBackendUrl() + '/rxbackend/profiles/');
}
