
class Host {
constructor(id,hostname,ipaddress,description,status,profile) {

this.id = id;
this.hostname = hostname;
this.ipaddress = ipaddress;
this.description = description;
this.profile = profile
this.status = status;
this.states = [];
 }

setStates(states) {
  this.states = states;
}
addState(state) {
  this.states.push(state)
}
getStates() {
  return this.states;
}

getId() {
  return this.id;
}
getStatus() {
  return this.status;
}
getProfile() {
  return this.profile
}
setProfile(profile) {
  this.profile = profile
}

setConnectionCredentials(connectioncredentials) {
  this.connectioncredentials = connectioncredentials;
}
getConnectionCredentials() {
  return this.connectioncredentials;
}
setHostname(value) {
  this.hostname = value;
}
setIpAddress(value) {
  this.ipaddress  = value;
}
getHostname() {
  return this.hostname;
}
getIpaddress() {
  return this.ipaddress;
}
getDescription() {
  return this.description;
}
}

export default Host;
