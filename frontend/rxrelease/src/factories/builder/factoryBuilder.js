import ObjectFactory from './ObjectFactory'
import ObjectMetadata from './objectMetadata'
import FieldMetadata from './fieldMetadata'
import  * as jsonUtils from '../../lib/json/utils'

class FactoryBuilder {

createObjectFactoryFromJson(json,clazz) {
var result = null;
// first normalize the json, so we can determine an objectmap
var normalizedJsonObject = jsonUtils.normalizeJson(json)

// if it is null return null
if(normalizedJsonObject != null) {
  var objectMetadata = new ObjectMetadata();
  for (const [key, value] of Object.entries(normalizedJsonObject)) {
    var field = new FieldMetadata(key,value)
    objectMetadata.addField(field)
  }
  var newObjectFactory = new ObjectFactory(objectMetadata)
  result = newObjectFactory;
}
return result;
}

}


export default FactoryBuilder
