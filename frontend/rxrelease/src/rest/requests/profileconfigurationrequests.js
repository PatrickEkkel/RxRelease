import Axios from 'axios';
import GlobalSettings from '../../config/global';



export function postConfiguration(configuration_name, selected_profile) {
    return Axios.post(GlobalSettings.getBackendUrl() + '/rxbackend/configurations/',
        {
        name: configuration_name,
        profile: selected_profile[0],
        hosts: []
      });
}
