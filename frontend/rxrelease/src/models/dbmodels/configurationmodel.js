

class ConfigurationModel {

  static newConfiguration(_id, _name, _profile_id, _hosts, _capability_id) {
    return {
      id: _id,
      name: _name,
      profile_id: _profile_id,
      hosts: _hosts,
      capability_id: _capability_id,
      setId(value) { this.id = value },
      getId() { return this.id },
      getName() { return this.name },
      getProfileId() { return this.profile_id },
      getHosts() { return this.hosts },
      getCapabilityId() { return this.capability_id }

     }
    }
  }

export default ConfigurationModel;
