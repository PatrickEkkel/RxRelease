

class ProfileModel {
  static newProfile(_id,_name) {
    return {
      id: _id,
      name: _name,
      getId: function() { return this.id },
      getName: function() { return this.name },
    }
  }
}

export default ProfileModel;
