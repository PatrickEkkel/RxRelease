import ObjectFactory from './ObjectFactory'
import ObjectMetadata from './objectMetadata'
import FieldMetadata from './fieldMetadata'
import  * as jsonUtils from '../../lib/json/utils'

class FactoryBuilder {
  // TODO: dit is fout en kapot, wordt gebruikt bij de modules/plugins actioncreator en is een armzalige poging om Java achtige te dingen te doen
  // De werkwijze die het best werkt is defineer een model in dbmodels src/models/dbmodels en gebruik dit om het object netjes te vullen,

  // NOTE: dit stukje code is overbodig, javascript heeft zulke dingen niet nodig
// DEZE OVERBODIGE ZUT NIET GEBRUIKEN!!!!!!!!!!!!!
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
