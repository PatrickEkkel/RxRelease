
class Profile {
  constructor(id,name) {
  this.id = id;
  this.name = name;
  }

  setProfileType(profiletype) {
    this.profiletype = profiletype
  }
  setName(name) {
    this.name = name
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}

export default Profile;
