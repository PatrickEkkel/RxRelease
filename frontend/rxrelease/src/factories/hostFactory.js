import Host from '../models/host'

class HostFactory {


convertJsonList(list) {
var result = [];
for(var i=0;i<list.length;i++) {
  result.push(this.createHostFromJson(list[i]));
}

return result;
}


static convertHostListToPk(list) {
  var result = [];

  for(var i=0;i<list.length;i++) {
    result.push(list[i].getId())
  }
  return result;

}

static convertHostListToMap(list) {
  var result = [];
  console.log("list lenght = " + list.length)
  console.log(list)
  for(var i=0;i<list.length;i++) {

    var map = [list[i].getId(),list[i].getHostname(),list[i].getIpaddress(),list[i].getDescription()];
    result.push(map)
  }
  return result;
}
static convertHostListToDictionary(list) {
 var result = [];
 for(var i=0;i<list.length;i++) {

   var map = {"id": list[i].getId(),"hostname": list[i].getHostname(),"ipaddress": list[i].getIpaddress(),"description": list[i].getDescription()};
   result.push(map)
 }
 return result;
}

createHostFromJson(json) {

var result = new Host(json.id,json.hostname,json.ipaddress,json.description)
return result;

}

}

export default HostFactory;
