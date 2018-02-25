import Axios from 'axios';
import SettingsFactory from '../factories/settingsFactory'
import AggregatedFieldsErrorHandler from '../rest/errorhandlers/aggregatedfieldserrorhandler'
import  * as settingsRequests from '../rest/requests/settingsrequests'
import  * as settingsPromises from '../rest/promises/settingspromises'
import  * as commonActions from './commonactions'


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
