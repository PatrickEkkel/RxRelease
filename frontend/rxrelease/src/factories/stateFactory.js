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

}

export default StateFactory
