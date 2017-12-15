import Host from '../models/host'

class HostFactory {


convertJsonList(list) {
var result = [];
for(var i=0;i<list.length;i++) {
  result.push(this.createHostFromJson(list[i]));
}

return result;
}


static convertMapToHost(list) {

var result = new Host(list[0],list[1],list[2],list[3],list[4]);

return result;
}

createHost(hostname,ipaddress,description) {
  return new Host(null,hostname,ipaddress,description,'UNMANAGED')
}
createHostFromJson(json) {
 var result = new Host(json.id,json.hostname,json.ipaddress,json.description,json.status)
 return result;
 }
}

export default HostFactory;
