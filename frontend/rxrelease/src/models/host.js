
class Host {
constructor(id,hostname,ipaddress,description,status) {

this.id = id;
this.hostname = hostname;
this.ipaddress = ipaddress;
this.description = description;
this.status = status;
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
