import Axios from 'axios';
import GlobalSettings from '../../config/global'
import LogFactory from '../../logging/LogFactory'



var settings = new GlobalSettings();
var wrLogger = new LogFactory().createLogger("WIZARD","REQUESTS")


export function postWizardState(wizard_id,wizard_status) {
  return Axios.post(GlobalSettings.getBackendUrl() + '/rxbackend/wizardstatus/',{
    wizard_id: wizard_id,
    wizard_status: wizard_status
  });
}

export function getWizardState(wizard_id) {
  return Axios.get(GlobalSettings.getBackendUrl() + '/rxbackend/wizardstatus/search/?wizard_id=' + wizard_id);
}

export function putWizardState(id,wizard_id,wizard_status) {
  return Axios.put(GlobalSettings.getBackendUrl() + '/rxbackend/wizardstatus/' + id + '/',{
    wizard_id: wizard_id,
    wizard_status: wizard_status
  });
}

export function getHosts() {

var backend_url = settings.getBackendUrl();

}
