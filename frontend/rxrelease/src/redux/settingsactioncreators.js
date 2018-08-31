import Axios from 'axios';
import SettingsFactory from '../factories/settingsFactory'
import LogFactory from '../logging/LogFactory'
import GlobalSettings from '../config/global'
import AggregatedFieldsErrorHandler from '../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as settingsRequests from '../rest/requests/settingsrequests'
import  * as settingsPromises from '../rest/promises/settingspromises'
import  * as commonActions from './commonactions'
import  * as jsonUtils from '../lib/json/utils'



var settings = new GlobalSettings();
var saLogger = new LogFactory().createLogger("HOSTS","ACTIONCREATOR")

export function loadAllSettings() {
  return [];
}


export function saveNewSetting(setting) {
  var errorHandler = new AggregatedFieldsErrorHandler();
  return function (dispatch) {
    settingsRequests.postSetting(setting).then(function(response) {
      dispatch({
        type: 'SAVE_NEW_SETTING'
      })
    }).catch(function(error) {
      errorHandler.addErrorResponse(error);
      errorHandler.handleErrors('SAVE_NEW_SETTING_FAILED',dispatch);
    });
  }
}

export function saveOrLoadNewCategory(category_name) {
  var errorHandler = new AggregatedFieldsErrorHandler();


  return function (dispatch) {

   settingsRequests.getSettingCategoryByName(category_name).then(function(response){
     return response;
   }).then(function(response) {

     var normalizedData = jsonUtils.normalizeJson(response.data)
     saLogger.debug("category response object")
     saLogger.trace(normalizedData)
     // if the response from getting the category is null, create a new category
     if(normalizedData == null) {
       category = settingsRequests.postSettingCategory(category_name);
       dispatch({
         type: 'SAVE_NEW_SETTING_CATEGORY',
         category: category
       })
     }
     else {
       var category =  response.data
       dispatch({
         type: 'LOAD_EXISTING_SETTING_CATEGORY'
       })
     }
   })
  }
}

export function loadAllSettingsCategories() {
  var categoriesDict = {};
  var settingsFactory = new SettingsFactory();
  return function (dispatch) {
    var requestsHandler = settingsRequests
    settingsRequests.getSettingsCategories().then(function(response) {
      categoriesDict = settingsFactory.convertSettingsCategoryFromJsonDict(response.data)
      var settingsRequests = [];
      var json = response.data;
      // get the list of setting per category
      Object.keys(categoriesDict).forEach(function(key) {
        var category =  categoriesDict[key];
        var request = requestsHandler.getSettingsByCategoryId(category.getId())
        settingsRequests.push(request)
      });
      return Axios.all(settingsRequests);

    }).then(function(response) {
      // multipromise repsonse
      for(var i=0;i<response.length;i++) {
       var settingsList = settingsFactory.convertSettingsFromJsonList(response[i].data);
       if(settingsList.length > 0) {
        var category_id =  settingsList[0].getCategoryId();
          categoriesDict[category_id].setSettings(settingsList)
        }
      }
      dispatch(settingsCategoriesLoaded(categoriesDict));
    }).catch(function(error) {
        commonActions.notAuthorized(error.response.status,error,dispatch)
    })
  }
}

export function initialSettingsState() {
  return {
    type: 'INITIAL_SETTINGS_STATE'
  }
}

export function newSetting(categories) {
  return {
    type: 'OPEN_NEW_SETTING',
    categories: categories
  }
}
export function settingsCategoriesLoaded(categories) {
  return {
     type: 'CATEGORIES_LOADED',
     categories: categories
  }
}
