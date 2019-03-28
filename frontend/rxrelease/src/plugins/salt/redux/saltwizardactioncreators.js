import LogFactory from '../../../logging/LogFactory'
import GlobalSettings from '../../../config/global';
import  * as jsonUtils from '../../../lib/json/utils'
import SettingsFactory from '../../../factories/settingsFactory'
import HostFactory from '../../../factories/hostFactory'
import SettingsCategoryModel from '../../../models/dbmodels/settingscategorymodel'
import HostModel from '../../../models/dbmodels/hostmodel'
import PromiseExecutor from '../../../lib/promises/promise_executor'
import AggregatedFieldsErrorHandler from '../../../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as hostsRequests from '../../../rest/requests/hostrequests'
import  * as settingsRequests from '../../../rest/requests/settingsrequests'
import  * as settingsPromises from '../../../rest/promises/settingspromises'
import  * as hostsPromises from '../../../rest/promises/hostpromises'

var settings = new GlobalSettings();
var swaLogger = new LogFactory().createLogger("SALTWIZARD","ACTIONCREATOR")


export function saveConfigureHost(current_host,salt_api_creds,ssh_creds) {
  //var category_name = "Salt Settings"
  //var category_prefix = "salt"
  var category =  SettingsCategoryModel.newSettingsCategoryModel("","Salt Settings","salt")

  var search_string =  encodeURI(settings.SETTING_CATEGORY_HOSTNAME)

  var settingsfactory = new SettingsFactory();
  var hostfactory = new HostFactory();
  //var profiletypefactory = new ProfileTypeFactory();
  var errorHandler = new AggregatedFieldsErrorHandler();
  return function(dispatch) {

    var e = new PromiseExecutor()
    swaLogger.trace("Current host object to be processed")
    swaLogger.traceObject(current_host)
    settingsRequests.getSettingCategoryByName(category.name)
    .then(e.execute(settingsPromises.CREATE_OR_UPDATE_SETTINGSCATEGORY,
      { category: category}))
    .then(e.execute(settingsPromises.UPDATE_SETTINGS_WITH_CATEGORY,
      {logger: swaLogger,salt_api_creds: salt_api_creds,search_string: search_string}))
    .then(e.execute(settingsPromises.CREATE_SETTINGSCATEGORY_IF_NOT_EXISTS,{}))
    .then(e.execute(settingsPromises.CREATE_CREDENTIAL_SETTINGS,
      {logger: swaLogger,ssh_creds: ssh_creds}))
    .then(e.execute(hostsPromises.CREATE_HOST_WITH_CONNECTION_CREDENTIALS,
      {logger: swaLogger,current_host: current_host}))
    .then(e.execute(settingsPromises.CREATE_CREDENTIAL_SETTINGS_NEW,
      {logger: swaLogger,salt_api_creds: salt_api_creds}))
    .then(e.execute(settingsPromises.GET_OR_CREATE_SETTINGSCATEGORY_FROM_HOST,
       {logger: swaLogger, category: current_host.getHostname()}))
    .then(e.execute(settingsPromises.GET_OR_CREATE_SETTING,
       { logger: swaLogger, category: settings.SETTING_CATEGORY_GLOBAL,key: 'sshport',value: '22' }))
    .then(e.execute(settingsPromises.GET_OR_CREATE_SETTING,
       { logger: swaLogger, category: settings.SETTING_CATEGORY_GLOBAL,key: 'saltapiport',value: '8082' }))
    .then(e.execute(settingsPromises.GET_OR_CREATE_SETTING,
      { logger: swaLogger, category: settings.SETTING_CATEGORY_GLOBAL,key: 'saltmaster',value: current_host.hostname}))
    .then(function(response) {

      swaLogger.trace("current stored state: ")
      swaLogger.traceObject(e.stored_state)

      dispatch({
        type: 'SAVE_NEW_HOST',
        saved_host: e.stored_state.current_host
      });
    }).catch(function(error) {
        errorHandler.addErrorResponse(error)
        errorHandler.handleErrors('SAVE_NEW_HOST_FAILED',dispatch)
    })
  }
}
