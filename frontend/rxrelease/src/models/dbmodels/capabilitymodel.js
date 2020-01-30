

class CapabilityModel {

  static newCapability(_id, _name, _statetypes) {
    return {
      id: _id,
      name: _name,
      statetypes: _statetypes,
      getName() {
        return this.name;
      },
      getStatetypes() {
        return this.statetypes;
      },
      getId() {
        return this.id;
      },
      setId(value) {
        this.id = value;
      }
    }
  }
}


export default CapabilityModel;
