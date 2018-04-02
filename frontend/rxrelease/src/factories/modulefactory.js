import Module from '../models/module'

class ModuleFactory {

convertJsonList(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    result.push(this.createModuleFromJson(list[i]));
  }

  return result;
  }
createModuleFromJson(json) {
   var result = new Module(json.id,json.name,json.active,json.menuoptionname)
   return result;
 }

}


export default ModuleFactory
