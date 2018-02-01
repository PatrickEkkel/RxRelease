
class Profile {
  constructor(id,name,profiletype) {
  this.id = id;
  this.name = name;
  this.profiletype = profiletype;
  }

  setProfileType(profiletype) {
    this.profiletype = profiletype
  }
  setName(name) {
    this.name = name
  }
  getName() {
    return this.name;
  }
  getProfileType() {
    return this.profiletype;
  }
}

export default Profile;
