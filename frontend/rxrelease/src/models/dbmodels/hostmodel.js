

class HostModel {
  static newHost(_id,_hostname,_ipaddress,_description,_profiletype) {
    return { hostname: _hostname,
      id: _id,
      ipaddress: _ipaddress,
      description: _description,
      profiletype_id: _profiletype,connectioncredentials: null,
      setConnectionCredentials:function(connectioncredentials) { this.connectioncredentials = connectioncredentials},
      getHostname: function() { return this.hostname },
      getIpaddress: function() { return this.ipaddress },
      getDescription: function() { return this.description },
      getProfileType: function() { return this.profiletype_id },
      getConnectionCredentials: function() { return this.connectioncredentials } }
  }
  static mapHost(_model) {
    return HostModel.newHost(_model.id,_model.hostname,_model.ipaddress,_model.description,_model.profiletype)
  }
}

export default HostModel;
