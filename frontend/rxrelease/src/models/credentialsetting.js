
class CredentialsSetting {

constructor(id,username,password) {
  this.id = id;
  this.username = username;
  this.password = password;
}

getSettingCategory() {
  return this.settingCategory;
}
setSettingCategory(settingCategory) {
  this.settingCategory = settingCategory;
}

getId() {
  return this.id;
}
getPassword() {
  return this.password;
}
setPassword(password) {
  this.password = password;
}
setUsername(username) {
  this.username = username;
}
getUsername() {
  return this.username;
 }
}

export default CredentialsSetting
