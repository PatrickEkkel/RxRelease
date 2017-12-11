import Axios from 'axios';
import SettingsFactory from '../factories/settingsFactory'
import  * as settingsRequests from '../rest/requests/settingsrequests'
import  * as settingsPromises from '../rest/promises/settingspromises'

export function loadAllSettings() {
  return [];
}


/*export function loadAllSettingsByName(name) {

  return function(dispatch) {

  }
}*/



/*
 TODO: modify this method to load the whole settings structure, this will make it easier to load the rest
*/
export function loadAllSettingsCategories() {
  var categoriesDict = {};
  var settingsFactory = new SettingsFactory();
  return function (dispatch) {
    var requestsHandler = settingsRequests
    settingsRequests.getSettingsCategories().then(function(response) {
      //console.log("put the categories in the object dude!!!")
      //console.log(response.data)
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
         console.log("en ditte dan?")
         console.log(category_id)
          categoriesDict[category_id].setSettings(settingsList)
        }
      }
      dispatch(settingsCategoriesLoaded(categoriesDict));
    })
  }
}


export function settingsCategoriesLoaded(categories) {
  return {
     type: 'LOAD_CATEGORIES',
     categories: categories
  }
}
