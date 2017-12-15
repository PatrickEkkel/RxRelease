
class StandardListConverters {

  /*
    Converts a list of objects that have the methods getId() and getName() to a format that can be handled by the LabeledDropDownLists
  */
  static convertObjectListToDDS(list) {
    var result = [];
    for(var i=0;i<list.length;i++) {
      var map = {"id": list[i].getId(),"name": list[i].getName()};
      result.push(map)
    }
    return result;
  }
  /*
   Strips a dictionary from its keys and converts it to a plain list
  */
  static convertDictToList(dict) {
    var result = [];
    Object.keys(dict).forEach(function(key) {
            result.push(dict[key]);
      });

    return result;
  }
  /*
    Takes a list with objects and converts it to the desired format, format can be specified in the getMapValues parameter like [item.getId(),item.getName()]
  */
  static convertListToMap(list,getMapValues) {
      var result = [];
      for(var i=0;i<list.length;i++) {
        var map = getMapValues(list[i])
        result.push(map)
      }
      return result;
    }
    /*
     Takes a list of Objects and reduces its contents to primary keys
    */
  static convertObjectListToPk(list) {
      var result = [];

      for(var i=0;i<list.length;i++) {
        result.push(list[i].getId())
      }
      return result;
    }
}


export default StandardListConverters;
