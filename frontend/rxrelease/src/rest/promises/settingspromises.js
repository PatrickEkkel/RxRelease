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
export function GET_CATEGORY_BY_ID(response, properties) {

var logger = properties.logger
var category_id = properties.settings_category_id
var context = properties.context
return settingsRequests.getSettingsByCategoryId(category_id).then(function(response) {
  var data = response.data
  logger.trace("received category from backend")
  logger.traceObject(data)
  context.addItem('category',SettingsCategoryModel.mapSettingsCategoryModel(data))
})
}

export function UPDATE_SETTING(response, properties) {

  var logger = properties.logger

  logger.trace("output from GET_OR_CREATE_SETTING")
  logger.traceObject(response.data)
  var normalized_data = jsonUtils.normalizeJson(response.data)
  var setting  = KVSettingModel.mapKVSetting(normalized_data)
  setting.setCategory(SettingsCategoryModel.newSettingsCategoryModel(normalized_data['category']))
  logger.traceObject(setting)
  return settingsRequests.putSetting(setting);

}
export function GET_SETTING(response, properties) {

var key = properties.key
var category_id = properties.category_id
var context = properties.context
var logger = properties.logger

// first get the category

return settingsRequests.getSettingsCategoryById(category_id).then(function(response) {
  var normalizedData = jsonUtils.normalizeJson(local_response.data)

  var settingsCategory = SettingsCategoryModel
  .newSettingsCategoryModel(normalizedData['id'], normalizedData['name'], normalizedData['prefix'])

  return settingsRequests.getSettingByKeyAndCategory(key,settingsCategory)
}).then(function(response) {
  var data = response.data
  context.addItem('setting_value', data['value'])
  logger.trace('Retrieving setting value from backend')
  logger.traceObject(data)
  return response
})


}

export function GET_OR_CREATE_SETTING(response, properties) {


  var key = properties.key
  var value = properties.value
  var category_name = properties.category_name
  var category_id = properties.category_id
  var value_store = properties.value_store
  var logger = properties.logger
  var normalizedData = null;
  var settingsCategory = null;
  var setting = null;
  var get_request = null;
  var search_param = null

  if(typeof value_store !== 'undefined') {
      value = properties.context.getItem(value_store)
  }
  if(typeof category_name !== 'undefined') {
    get_request = settingsRequests.getSettingCategoryByName
    search_param = category_name
    logger.trace('Retrieving category by name')
  }
  else if (typeof category_id !== 'undefined') {
    get_request = settingsRequests.getSettingsCategoryById
    search_param = category_id
    logger.trace("Retrieving category by id")
  }
  logger.trace("category response")
  logger.traceObject(normalizedData)

  // determine if we are searching category by name or by id
  return get_request(search_param).then(function(local_response) {
      normalizedData = jsonUtils.normalizeJson(local_response.data)
      if(normalizedData == null) {
        logger.trace("can't find SettingsCategory")
        logger.traceObject(category_name)
      }
      else {
        settingsCategory = SettingsCategoryModel
        .newSettingsCategoryModel(normalizedData['id'], normalizedData['name'], normalizedData['prefix'])
        setting = KVSettingModel.newKVSetting(null, key, value,settingsCategory)
      }
      logger.trace('key: ' + key)
      logger.trace('settings category')
      logger.traceObject(settingsCategory)
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
