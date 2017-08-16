
class Host {
constructor(id,hostname,ipaddress,description,status) {

this.id = id;
this.hostname = hostname;
this.ipaddress = ipaddress;
this.description = description;
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
