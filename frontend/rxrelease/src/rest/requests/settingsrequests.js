import Axios from 'axios';
import GlobalSettings from '../../config/global';
import LogFactory from '../../logging/LogFactory'

var settings = new GlobalSettings();
var srLogger = new LogFactory().createLogger("SETTINGS","REQUESTS")


// TODO: Deze methode hernoemen, verkeerde naam en de methode aanroepen zijn niet consistent
export function postSettings(username,password,settingscategory) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/settings/credentials',{
  category:   settingscategory.getId(),
  username: username,
  password: password
  })
}

export function postCredentialSettings(settings) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/settings/credentials', {
    username: settings.getUsername(),
    password: settings.getPassword(),
    category: settings.getSettingCategory().getId()
  })
}


export function postSetting(setting) {
var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/settings/kvsettings',{
  key: setting.getKey(),
  value: setting.getValue() ,
  category: setting.getCategory().getId()
})
}

export function postCategory(category) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/settingscategory/',{
    name: category.name,
    prefix: category.prefix
  })
}
export function putSettingByKey(setting) {
  srLogger.trace("updating setting with key: " + key + " and value: " + value)
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.put(backend_url + '/rxbackend/settings/kvsettings/update', {
    key: key,
    value: value,
    category_id: setting.getCategory().getId()
    })
}

export function putSetting(setting) {

  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.put(backend_url + '/rxbackend/settings/kvsettings/' + setting.getId() + '/',{
    key: setting.getKey(),
    value: setting.getValue() ,
    category: setting.getCategory().getId()
  })

}
// NOTE: this method does not seem to be used
/*export function putSetting(category,key,value) {
  srLogger.trace("updating setting with key: " + key + " and value: " + value)
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.put(backend_url + '/rxbackend/settings/kvsettings/' + key + '/', {
    username: settings.getUsername(),
    password: settings.getPassword(),
    category: settings.getSettingCategory().getId()
  })

} */

export function putCredentialSettings(settings) {
  srLogger.trace("voordat we de settings opslaan eerst even een kijkje nemen")
  srLogger.traceObject(settings)
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.put(backend_url + '/rxbackend/settings/credentials/' + settings.getId() + '/', {
    username: settings.getUsername(),
    password: settings.getPassword(),
    category: settings.getSettingCategory().getId()
  })
}

export function getCredentialSettingsByHostById(id) {

  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/settings/credentials/' + id)
}

export function getSettingsCategories() {
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/settingscategory')
}

export function getSettingsByCategoryId(id) {
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/settings/search/?category_id=' + id)
}

export function getSettingsCategoryById(id) {
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/settingscategory/' + id )
}

export function getSettingByKeyAndCategory(key,category) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.get(backend_url
     + '/rxbackend/settings/search/?category_name='
     + category.getName()
     + '&settings_key=' + key)
}

export function getSettingCategoryByName(name) {
var backend_url = GlobalSettings.getBackendUrl();

return Axios.get(backend_url + '/rxbackend/settingscategory/search/?category_name=' + name )
}
export function postSettingCategory(name) {
var backend_url = GlobalSettings.getBackendUrl();
return Axios.post(backend_url + '/rxbackend/settingscategory/',
{
  name: name
});

}
