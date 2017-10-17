
class GlobalSettings {



constructor() {
  this.BACKEND_LOCATION = 'localhost'
  this.BACKEND_PORT = '8080'
  this.BACKEND_PROTOCOL = 'http'
  this.SETTING_CATEGORY_HOSTNAME = "Host Settings"

}

static getBackendUrl() {
  var settings = new GlobalSettings();
  return settings.BACKEND_PROTOCOL + '://' + settings.BACKEND_LOCATION + ':' + settings.BACKEND_PORT;
}

// helpers that make the use of the configuration easier

}

export default GlobalSettings;
