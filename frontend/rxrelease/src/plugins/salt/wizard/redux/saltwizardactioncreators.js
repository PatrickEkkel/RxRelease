import LogFactory from '../../../../logging/LogFactory'
import GlobalSettings from '../../../../config/global';
import  * as jsonUtils from '../../../../lib/json/utils'
import SettingsFactory from '../../../../factories/settingsFactory'
import HostFactory from '../../../../factories/hostFactory'
import SettingsCategoryModel from '../../../../models/dbmodels/settingscategorymodel'
import HostModel from '../../../../models/dbmodels/hostmodel'
import AggregatedFieldsErrorHandler from '../../../../rest/errorhandlers/aggregatedfieldserrorhandler'
import * as hostsRequests from '../../../../rest/requests/hostrequests'
import  * as settingsRequests from '../../../../rest/requests/settingsrequests'


var settings = new GlobalSettings();
var swaLogger = new LogFactory().createLogger("SALTWIZARD","ACTIONCREATOR")


export function saveConfigureHost(host,salt_api_creds) {
  var category_name = host.hostname
  var category = null
  var search_string =  encodeURI(settings.SETTING_CATEGORY_HOSTNAME)

  var settingsfactory = new SettingsFactory();
  var hostfactory = new HostFactory();
  //var profiletypefactory = new ProfileTypeFactory();
  var errorHandler = new AggregatedFieldsErrorHandler();


  return function (dispatch) {

    settingsRequests.getSettingCategoryByName(category_name)
    .then(function(response) {
      var normalizedData = jsonUtils.normalizeJson(response.data)
      // if the response from getting the category is null, create a new category
      if(normalizedData == null) {
        return settingsRequests.postSettingCategory(category_name);
      }
      else {
        return settingsRequests.getSettingCategoryByName(category_name)
      }

    })
    .then(function(response) {
      category =  jsonUtils.normalizeJson(response.data)
      swaLogger.debug("category response object")
      swaLogger.traceObject(category)
      salt_api_creds.setSettingCategory(SettingsCategoryModel.mapSettingsCategoryModel(category))
      return settingsRequests.getSettingCategoryByName(search_string)
    })
    .then(function(response) {
        var normalizedData = jsonUtils.normalizeJson(response.data)
        // if the response from getting the category is null, create a new category
        if(normalizedData == null) {
          return settingsRequests.postSettingCategory(settings.SETTING_CATEGORY_HOSTNAME);
        }
        else {
          return response;
        }
    })
    .then(function(response) {
       swaLogger.debug("settingcategory: ")
       swaLogger.traceObject(response.data)

       var settingscategory = settingsfactory.createSettingsCategoryFromJson(jsonUtils.normalizeJson(response.data));
       // TODO: dit is niet goed natuurlijk, hier moeten we settings meegeven vanuit de GUI

      return settingsRequests.postSettings('test','test,',settingscategory)
    })
    .then(function(response) {
      var connectioncredentials = settingsfactory.createCredentialSettingFromJson(jsonUtils.normalizeJson(response.data))
      host.setConnectionCredentials(connectioncredentials)

      swaLogger.debug("host to be saved: ")
      swaLogger.traceObject(host)

      return hostsRequests.postHost(host);
    })
    .then(function(response) {
      swaLogger.debug("salt_api_creds")
      swaLogger.traceObject(salt_api_creds)
      swaLogger.debug("saved host: ")
      swaLogger.traceObject(host)
      host = HostModel.mapHost(jsonUtils.normalizeJson(response.data))
      return settingsRequests.postCredentialSettings(salt_api_creds)
    })
    .then(function(response) {

      var normalizedData = jsonUtils.normalizeJson(response.data)



      dispatch({
        type: 'SAVE_NEW_HOST',
        saved_host: host
      })
    }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_HOST_FAILED',dispatch)
    });


  }
}
