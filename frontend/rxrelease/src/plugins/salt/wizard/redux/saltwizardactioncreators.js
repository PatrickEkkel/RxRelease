import LogFactory from '../../../../logging/LogFactory'
import GlobalSettings from '../../../../config/global';
import  * as jsonUtils from '../../../../lib/json/utils'
import SettingsFactory from '../../../../factories/settingsFactory'
import HostFactory from '../../../../factories/hostFactory'
import AggregatedFieldsErrorHandler from '../../../../rest/errorhandlers/aggregatedfieldserrorhandler'


import * as hostsRequests from '../../../../rest/requests/hostrequests'
import  * as settingsRequests from '../../../../rest/requests/settingsrequests'


var settings = new GlobalSettings();
var swaLogger = new LogFactory().createLogger("SALTWIZARD","ACTIONCREATOR")


export function saveConfigureHost(host) {
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

      swaLogger.debug("category response object")
      swaLogger.trace(normalizedData)
      // if the response from getting the category is null, create a new category
      if(normalizedData == null) {
        category = settingsRequests.postSettingCategory(category_name);
      }
      else {
        category =  response.data
      }
      return response
    })
    .then(settingsRequests.getSettingCategoryByName(search_string))
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
      alert('bowbow')

      var connectioncredentials = settingsfactory.createCredentialSettingFromJson(jsonUtils.normalizeJson(response.data))
      host.setConnectionCredentials(connectioncredentials)
      return hostsRequests.postHost(host);
    })
    .then(function(response) {
      dispatch({
        type: 'SAVE_NEW_HOST',
        saved_host: response.data
      })
    }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_HOST_FAILED',dispatch)
    });


  }
}
