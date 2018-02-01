import Profile from '../models/profile'

class ProfileFactory {


createProfile(name,profiletype) {

 var result = new Profile();
 result.setProfileType(profiletype);
 result.setName(name);

 return result;
}
}


export default ProfileFactory;
