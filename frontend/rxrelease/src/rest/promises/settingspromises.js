import Axios from 'axios';
import SettingsFactory from '../../factories/settingsFactory'
import  * as settingsRequests from '../requests/settingsrequests'


export function doCreateSettingsCategory(response) {
  var settingsfactory = new SettingsFactory();
    settingsRequests.postSettingCategory(settings.SETTING_CATEGORY_HOSTNAME);

}
