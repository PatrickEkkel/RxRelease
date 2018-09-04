

class CredentialsModel {

  static newCredentials(_username,_password) {
    return {
       username: _username,
       password: _password,
       category: "",
       getUsername: function() { return this.username },
       getPassword: function() { return this.password },
       getSettingCategory: function() { return this.category },
       setSettingCategory: function(_category) { this.category = _category}
     }
  }
}

export default CredentialsModel;
