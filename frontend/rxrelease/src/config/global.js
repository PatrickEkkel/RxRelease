
class GlobalSettings {



constructor() {
  this.BACKEND_LOCATION = 'localhost'
  this.BACKEND_PORT = '8080'
  this.BACKEND_PROTOCOL = 'http'
  this.SETTING_CATEGORY_HOSTNAME = "Host Settings"
  this.SETTING_CATEGORY_GLOBAL = "Global Settings"
  // TODO: this is a workaround, because the backend is lacking a proper API for this information
  this.LOCAL_SALT_STORE = 'salt-formulas'
  this.LOGLEVEL = "TRACE"
  // if this contins NONE, deny any loggging, if it contains ALL, ALLOW everything to get trought, if it contains LIST, log only the components/subcomponents that are listed
  this.LOGMODULES = "LIST"
  // Will only be used if we LOGMODULES contains te value list
  // To access Reducer Logging you can add the following 'REDUCER.<Reducer Name>', for example to get the HOST Redcuer Logging add 'REDUCER.HOST'
  //this.ENABLED_LOGGING = ['HOSTS.HOSTMANAGEMENTPANEL','HOSTS.HOSTSPANEL','HOSTS.ACTIONCREATOR','REDUCER.HOST','PROFILES.ACTIONCREATOR']
  this.ENABLED_LOGGING = ['HOSTS.ACTIONCREATOR']


}

static getBackendUrl() {
  var settings = new GlobalSettings();
  return settings.BACKEND_PROTOCOL + '://' + settings.BACKEND_LOCATION + ':' + settings.BACKEND_PORT;
}
static getEnabledLogging() {
  var settings = new GlobalSettings();
  return settings.ENABLED_LOGGING;
}
static getLogModules() {
  var settings = new GlobalSettings();
  return settings.LOGMODULES;
}
static getLogLevel() {
  var settings = new GlobalSettings();
  return settings.LOGLEVEL;
}
// helpers that make the use of the configuration easier

}

export default GlobalSettings;
