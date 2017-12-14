import CredentialsSetting from '../models/credentialsetting'
import KeyValueSetting from '../models/keyvaluesetting'
import SettingsCategory from '../models/settingscategory'
import  * as jsonUtils from '../lib/json/utils'

class SettingsFactory {


constructor() {

}
// SettingsCategories
newHostSettingsCategory() {
  return new SettingsCategory('','Host Settings')
}

convertSettingsCategoryFromJsonList(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    result.push(this.createSettingsCategoryFromJson(list[i]));
  }
  return result;
  }
convertSettingsCategoryFromJsonDict(list) {
  var result = {}
  for(var i=0;i<list.length;i++) {
    var newObject = this.createSettingsCategoryFromJson(list[i]);
    result[newObject.getId()] = newObject;
  }
  return result;
  }

createSettingsCategoryFromJson(json) {
  var result = null;
  if(json != null) {
    result = new SettingsCategory(json.id,json.name)
  }
  return result;
}
// KeyvalueSettings

createSettingFromJson(json) {
  var result = null;
  if(json != null) {
    result = new KeyValueSetting(json.id,json.key,json.value,json.category)
  }
  return result;
}
convertSettingsFromJsonList(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    result.push(this.createSettingFromJson(list[i]));
  }
  return result;
}
newKeyValueSetting(key,value,category_id) {
  return new KeyValueSetting(0,key,value,category_id)
}
// CredentialsSetings
createCredentialSettingFromJson(json) {
  var result = null;
  if(json != null) {
   var result = new CredentialsSetting(json.id,json.username,json.password)
  }
  return result;
}
newEmpyCredentials() {

return new CredentialsSetting('','','')
}


// TODO: dit is een generieke methode, er is geen enkele reden deze telkens te dupliceren voor elke factory
static convertListToMap(list) {
    var result = [];
    for(var i=0;i<list.length;i++) {
      var map = [list[i].getId(),list[i].getKey(),list[i].getValue()];
      result.push(map)
    }
    return result;
  }
static convertDictToList(dict) {
  var result = [];
  Object.keys(dict).forEach(function(key) {
          result.push(dict[key]);
    });

  return result;
}
static convertSettingsListToDictionary(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    var map = {"id": list[i].getId(),"name": list[i].getName()};
    result.push(map)
  }
  return result;
}

}

export default SettingsFactory
