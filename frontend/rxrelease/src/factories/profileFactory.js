import Profile from '../models/profile'
// NOTE:  Legacy dit niet meer gebruiken in de toekomst
class ProfileFactory {


createProfile(name,profiletype) {

 var result = new Profile();
 result.setProfileType(profiletype);
 result.setName(name);

 return result;
}
}


export default ProfileFactory;
