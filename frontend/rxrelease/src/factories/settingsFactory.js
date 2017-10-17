import CredentialsSetting from '../models/credentialsetting'
import SettingsCategory from '../models/settingscategory'
import  * as jsonUtils from '../lib/json/utils'


class SettingsFactory {


constructor() {

}

newEmpyCredentials() {

return new CredentialsSetting('','','')
}

newHostSettingsCategory() {
  return new SettingsCategory('','Host Settings')
}

createSettingsCategoryFromJson(json) {
  var result = null;
  if(json != null) {
    result = new SettingsCategory(json.id,json.username)
  }
  return result;
}

createCredentialSettingFromJson(json) {
  var result = null;
  if(json != null) {
   var result = new CredentialsSetting(json.id,json.username,json.passwords)
  }
  return result;
}

}

export default SettingsFactory
