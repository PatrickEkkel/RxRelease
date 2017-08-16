
class State {
  constructor(id,name,installed) {
  this.id = id;
  this.name = name;
  this.installed = installed;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getInstalled() {
    return this.installed;
  }
}

export default State;
