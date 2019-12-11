
class StateType {

  constructor(id, name, module, handler, jobtype) {
    this.id = id
    this.name = name
    this.module = module
    this.jobtype = jobtype
    this.handler = handler
  }

  getId() {
    return this.id
  }
}

export default StateType
