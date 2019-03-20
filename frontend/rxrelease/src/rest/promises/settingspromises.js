import  * as jsonUtils from '../../lib/json/utils'
import  * as settingsRequests from '../../rest/requests/settingsrequests'
import GlobalSettings from '../../config/global';
import HostModel from '../../models/dbmodels/hostmodel'
import SettingsFactory from '../../factories/settingsFactory'
import SettingsCategoryModel from '../../models/dbmodels/settingscategorymodel'
import KVSettingModel from '../../models/dbmodels/kvsettingmodel'

export function UPDATE_SETTINGS_WITH_CATEGORY(response,properties) {
  var swaLogger = properties.logger

  var category =  jsonUtils.normalizeJson(response.data)
  swaLogger.debug("category response object")
  swaLogger.traceObject(category)
  // It is kinda stupid to call these salt_api_creds
  properties.salt_api_creds.setSettingCategory(SettingsCategoryModel.mapSettingsCategoryModel(category))
  return settingsRequests.getSettingCategoryByName(properties.search_string)

}

export function CREATE_OR_UPDATE_SETTINGSCATEGORY(response,properties) {

    var category = properties.category

    var normalizedData = jsonUtils.normalizeJson(response.data)
    // if the response from getting the category is null, create a new category
    if(normalizedData == null) {
      return settingsRequests.postSettingCategory(category);
    }
    else {
      return settingsRequests.getSettingCategoryByName(category.name)
    }
}
// NOTE: deze methode is deprecated, neit meer gebruiken, gebruik ipv dit gedrocht CREATE_CREDENTIAL_SETTINGS_NEW
export function CREATE_CREDENTIAL_SETTINGS(response,properties) {

  var swaLogger = properties.logger
  var settingsfactory = new SettingsFactory();
  var ssh_creds = properties.ssh_creds

  swaLogger.debug("settingcategory: ")
  swaLogger.traceObject(response.data)
  var settingscategory = settingsfactory.createSettingsCategoryFromJson(jsonUtils.normalizeJson(response.data));
  // TODO: dit is niet goed natuurlijk, hier moeten we settings meegeven vanuit de GUI
 return settingsRequests.postSettings(ssh_creds.username,ssh_creds.password,settingscategory)
}
export function CREATE_CREDENTIAL_SETTINGS_NEW(response,properties) {

  var swaLogger = properties.logger
  var host = properties.current_host
  // TODO: dit is een beetje stom om deze dingen salt_api_creds te noemen
  var creds = properties.salt_api_creds

  if(host != null) {
    swaLogger.debug("creds")
    swaLogger.traceObject(creds)
    host = HostModel.mapHost(jsonUtils.normalizeJson(response.data))
    properties.current_host = host
    swaLogger.trace("saved host: ")
    swaLogger.traceObject(properties.current_host)
  }
  return settingsRequests.postCredentialSettings(creds)

}
// NOTE: give this thing another name, it conflicts
// TODO: this one can be replaced with CREATE_SETTINGSCATEGORY_IF_NOT_EXISTS_NEW
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

export function GET_OR_UPDATE_SETTING(response, properties) {

  var key = properties.key
  var value = properties.value
  var category = properties.category
  var logger = properties.logger
  var normalizedData = null;
  var settingsCategory = null;
  var setting = null;
  logger.trace("category response")
  logger.traceObject(normalizedData)

  return settingsRequests.getSettingCategoryByName(category).then(function(local_response) {
      normalizedData = jsonUtils.normalizeJson(local_response.data)
      if(normalizedData == null) {
        logger.debug("can't find SettingsCategory: " + category)
      }
      else {
        settingsCategory = SettingsCategoryModel
        .newSettingsCategoryModel(normalizedData['id'], normalizedData['name'], normalizedData['prefix'])
        setting = KVSettingModel.newKVSetting(null, key, value,settingsCategory)
      }
      return settingsRequests.getSettingByKeyAndCategory(key,settingsCategory)
  }).then(function(local_response) {

    normalizedData = jsonUtils.normalizeJson(local_response.data)

    if(normalizedData != null) {
      logger.trace("Recieved setting")
      logger.traceObject(normalizedData)
      return local_response
    }
    else {
      return settingsRequests.postSetting(setting)
    }
  })
}

export function GET_OR_CREATE_SETTINGSCATEGORY_FROM_HOST(response, properties) {

  var logger = properties.logger
  var host = properties.current_host
  var category = properties.category
  logger.trace('get SettingsCategory for: ' + host.getHostname())
  logger.traceObject(host)
  return settingsRequests.getSettingCategoryByName(host.getHostname())
    .then(function(local_response) {
        var normalizedData = jsonUtils.normalizeJson(local_response.data)

        if(normalizedData == null) {
          return settingsRequests.postSettingCategory(category)
        }
        else {
          return local_response
        }
    })

}

export function CREATE_SETTINGSCATEGORY_IF_NOT_EXISTS_NEW(response,properties) {
  var logger = properties.logger
  var host = properties.current_host
  var category = properties.category
  properties.category = null
  var normalizedData = jsonUtils.normalizeJson(response.data)
  logger.trace('settingscategory')
  logger.traceObject(normalizedData)
  if(normalizedData == null) {
    return settingsRequests.postSettingCategory(category)
  }
  else {
    return response
  }
}
