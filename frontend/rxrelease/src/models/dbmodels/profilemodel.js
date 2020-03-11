

class ProfileModel {
  static newProfile(_id,_name,_inheritedprofile) {
    return {
      id: _id,
      name: _name,
      inheritedprofile: _inheritedprofile,
      getId: function() { return this.id },
      getName: function() { return this.name },
      getInherited: function() { return this.inheritedprofile }
    }
  }
}

export default ProfileModel;
