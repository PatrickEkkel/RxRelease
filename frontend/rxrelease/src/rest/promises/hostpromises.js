import  * as jsonUtils from '../../lib/json/utils'
import  * as settingsRequests from '../../rest/requests/settingsrequests'
import GlobalSettings from '../../config/global';
import SettingsFactory from '../../factories/settingsFactory'
import SettingsCategoryModel from '../../models/dbmodels/settingscategorymodel'
import  * as hostsRequests from '../../rest/requests/hostrequests'


export function CREATE_HOST_WITH_CONNECTION_CREDENTIALS(response,properties){

  var host = properties.current_host
  var swaLogger = properties.logger

  var settingsfactory = new SettingsFactory();

  var connectioncredentials = settingsfactory.createCredentialSettingFromJson(jsonUtils.normalizeJson(response.data))
  host.setConnectionCredentials(connectioncredentials)

  swaLogger.debug("host to be saved: ")
  swaLogger.traceObject(host)

  return hostsRequests.postHost(host);


}
