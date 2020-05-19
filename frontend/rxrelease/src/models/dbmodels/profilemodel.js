

class ProfileModel {
  static newProfile(_id,_name,_inheritedprofile) {
    return {
      id: _id,
      name: _name,
      inheritedprofile: _inheritedprofile,
      default_configuration: null,
      getId: function() { return this.id },
      getName: function() { return this.name },
      getInherited: function() { return this.inheritedprofile },
      getDefaultConfiguration: function() { return this.default_configuration}
    }
  }
}

export default ProfileModel;
