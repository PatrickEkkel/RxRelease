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
