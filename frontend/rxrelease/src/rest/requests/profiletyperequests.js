import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function getProfileTypes() {
  return Axios.get( GlobalSettings.getBackendUrl() + '/rxbackend/profiletypes/');
}
