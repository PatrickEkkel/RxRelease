import Axios from 'axios';
import GlobalSettings from '../../config/global';


export function postSettings(username,password,settingscategory) {
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.post(backend_url + '/rxbackend/settings/credentials',{
  category:   settingscategory.getId(),
  username: username,
  password: password
  })
}


/*export function getCredentialSettingsByHost(host) {

  var host_id = host.getId();
  var backend_url = GlobalSettings.getBackendUrl();

  return Axios.get(backend_url + '/rxbackend/')
}*/

export function postSetting(setting) {
var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/settings/kvsettings',{
  key: setting.getKey(),
  value: setting.getValue() ,
  category: setting.getCategoryId()
})

}

export function putCredentialSettings(settings) {
  console.log("voordat we de settings opslaan eerst even een kijkje nemen")
  console.log(settings)
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.put(backend_url + '/rxbackend/settings/credentials/' + settings.getId() + '/',
  {
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
