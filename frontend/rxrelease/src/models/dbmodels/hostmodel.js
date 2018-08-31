

class HostModel {

  static newHost(_hostname,_ipaddress,_description,_profiletype) {
    return { hostname: _hostname,
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
}

export default HostModel;
