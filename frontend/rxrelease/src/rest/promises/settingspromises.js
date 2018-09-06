import  * as jsonUtils from '../../lib/json/utils'
import  * as settingsRequests from '../../rest/requests/settingsrequests'
import GlobalSettings from '../../config/global';
import HostModel from '../../models/dbmodels/hostmodel'
import SettingsFactory from '../../factories/settingsFactory'
import SettingsCategoryModel from '../../models/dbmodels/settingscategorymodel'




export function UPDATE_SETTINGS_WITH_CATEGORY(response,properties) {
  var swaLogger = properties.logger

  var category =  jsonUtils.normalizeJson(response.data)
  swaLogger.debug("category response object")
  swaLogger.traceObject(category)
  properties.salt_api_creds.setSettingCategory(SettingsCategoryModel.mapSettingsCategoryModel(category))
  return settingsRequests.getSettingCategoryByName(properties.search_string)

}

export function CREATE_OR_UPDATE_SETTINGSCATEGORY(response,properties) {

    var normalizedData = jsonUtils.normalizeJson(response.data)
    // if the response from getting the category is null, create a new category
    if(normalizedData == null) {
      return settingsRequests.postSettingCategory(properties.category_name);
    }
    else {
      return settingsRequests.getSettingCategoryByName(properties.category_name)
    }
}
// NOTE: deze methode is deprecated, neit meer gebruiken, gebruik ipv dit gedrocht CREATE_CREDENTIAL_SETTINGS_NEW
export function CREATE_CREDENTIAL_SETTINGS(response,properties) {

  var swaLogger = properties.logger
  var settingsfactory = new SettingsFactory();

  swaLogger.debug("settingcategory: ")
  swaLogger.traceObject(response.data)
  var settingscategory = settingsfactory.createSettingsCategoryFromJson(jsonUtils.normalizeJson(response.data));
  // TODO: dit is niet goed natuurlijk, hier moeten we settings meegeven vanuit de GUI
 return settingsRequests.postSettings(properties.username,properties.password,settingscategory)
}
export function CREATE_CREDENTIAL_SETTINGS_NEW(response,properties) {

  var swaLogger = properties.logger
  var host = properties.current_host
  var salt_api_creds = properties.salt_api_creds

  swaLogger.debug("salt_api_creds")
  swaLogger.traceObject(salt_api_creds)
  host = HostModel.mapHost(jsonUtils.normalizeJson(response.data))
  properties.current_host = host
  swaLogger.trace("saved host: ")
  swaLogger.traceObject(properties.current_host)

  return settingsRequests.postCredentialSettings(salt_api_creds)

}

export function CREATE_SETTINGSCATEGORY_IF_NOT_EXISTS(response,properties) {

  var settings = new GlobalSettings();

  var normalizedData = jsonUtils.normalizeJson(response.data)
  // if the response from getting the category is null, create a new category
  if(normalizedData == null) {
    return settingsRequests.postSettingCategory(settings.SETTING_CATEGORY_HOSTNAME);
  }
  else {
    return response;
  }
}
