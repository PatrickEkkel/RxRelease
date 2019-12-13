
class StateType {

  constructor(id, name, module, handler, jobtype) {
    this.id = id
    this.name = name
    this.module = module
    this.jobtype = jobtype
    this.handler = handler
    this.dependence = 'nan'
  }

  getId() {
    return this.id
  }
  getName() {
    return this.name
  }
  getModule() {
    return this.module
  }
  getHandler() {
    return this.handler
  }
  getJobtype() {
    return this.jobtype
  }
  getDependence() {
    return this.dependence
  }
}

export default StateType
