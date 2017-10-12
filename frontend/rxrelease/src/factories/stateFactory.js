import State from '../models/state'
class StateFactory {

convertJsonList(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    result.push(this.createStateFromJson(list[i]));
  }

  return result;
  }

createStateFromJson(json) {

  var result = new State(json.id,json.name,json.installed)
  return result;
}
static convertStateListToMap(list) {
  var result = [];

  for(var i=0;i<list.length;i++) {

    var installed = list[i].getInstalled()

    var installedDisplayString = "NOT INSTALLED"
    if(installed) {
      installedDisplayString =  "INSTALLED"
    }


    var map = [list[i].getId(),list[i].getName(),installedDisplayString];
    result.push(map)
  }
  return result;
}

}

export default StateFactory
