

class StateTypeModel {
  static newStateType(_name) {
    return {
      id: null,
      name: _name,
      getName() { return this.name}
    }
  }
}

export default StateTypeModel;
