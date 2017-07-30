
class Host {
constructor(id,hostname,ipaddress,description) {

this.id = id;
this.hostname = hostname;
this.ipaddress = ipaddress;
this.description = description;
 }


getId() {
  return this.id;
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
