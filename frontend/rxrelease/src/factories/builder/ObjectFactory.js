
// DEZE OVERBODIGE ZUT NIET GEBRUIKEN!!!!!!!!!!!!!
class ObjectFactory {

constructor(objectMetadata) {
  this.metadata = objectMetadata;
}

createObjectListFromJson(json) {
  var result = []
  for(var i=0;i<json.length;i++) {
   var newObject =   this.createObjectFromJson(json[i])
    result.push(newObject)
  }
  return result

}
createObjectFromJson(json) {
  return json
}

}

export default ObjectFactory;
