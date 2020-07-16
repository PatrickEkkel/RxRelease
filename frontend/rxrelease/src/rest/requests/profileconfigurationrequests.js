import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function getConfigurationById(configuration_id) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/configurations/' + configuration_id);
}


export function postConfiguration(configuration) {
    return Axios.post(GlobalSettings.getBackendUrl() + '/rxbackend/configurations/',
        {
        name: configuration.getName(),
        profile: configuration.getProfileId(),
        hosts: configuration.getHosts(),
        capability: configuration.getCapabilityId()
      });
}
