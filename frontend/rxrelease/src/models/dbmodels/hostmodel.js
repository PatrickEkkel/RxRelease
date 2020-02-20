

class HostModel {
  static newHost(_id,_hostname,_ipaddress,_description,_profile) {
    return { hostname: _hostname,
      id: _id,
      ipaddress: _ipaddress,
      description: _description,
      profile: _profile,
      profile_id: _profile.getId(),connectioncredentials: null,
      setConnectionCredentials: function(connectioncredentials) { this.connectioncredentials = connectioncredentials},
      getHostname: function() { return this.hostname },
      getIpaddress: function() { return this.ipaddress },
      getDescription: function() { return this.description },
      getProfile: function() { return this.profile },
      getConnectionCredentials: function() { return this.connectioncredentials } }
  }
  static mapHost(_model) {
    return HostModel.newHost(_model.id,_model.hostname,_model.ipaddress,_model.description,_model.profile)
  }
}

export default HostModel;
