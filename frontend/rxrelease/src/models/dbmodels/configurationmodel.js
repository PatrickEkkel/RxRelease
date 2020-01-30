

class ConfigurationModel {

  static newConfiguration(_id, _name, _profile_id, _hosts, _capability) {
    return {
      id: _id,
      name: _name,
      profile_id: _profile_id,
      hosts: _hosts,
      capability: _capability,

      getId() { return this.id },
      getName() { return this.name },
      getProfileId() { return this.profile_id },
      getHosts() { return this.hosts },
      getCapability() { return this.capability }

     }
    }
  }

export default ConfigurationModel;
