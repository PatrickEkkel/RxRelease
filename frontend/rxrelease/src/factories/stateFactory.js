import State from '../models/state'

// NOTE:  Legacy dit niet meer gebruiken in de toekomst
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
