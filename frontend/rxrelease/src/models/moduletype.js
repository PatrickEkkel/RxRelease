

class ModuleType {

  constructor(id, name) {
    this.id = id
    this.name = name
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name
  }

  static ModuleTypes() {
    return  [new ModuleType('rxdockercompose','Docker compose'), new ModuleType('rxsalt','Salt')];
  }
}

export default ModuleType;
