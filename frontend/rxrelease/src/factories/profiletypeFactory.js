import ProfileType from '../models/profiletype'


class ProfileTypeFactory {

constructor() {

}
convertJsonList(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    profileType =   createProfiletypeFromJson(list[i])
    result.push(profileType)
  }

  return result;
}
createProfileType(id,name) {
  return new ProfileType(id,name)
}
createProfiletypeFromJson(json) {
  var result = new ProfileType(json.id,json.name)

  return result;
}
static convertProfiletypeListToNamedList(list) {
  var result = [];
  for(var i=0;i<list.length;i++) {
    result.push(list[i].getName())
  }
  return result;
}
}

export default ProfileTypeFactory;
