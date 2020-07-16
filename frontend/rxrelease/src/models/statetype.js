
class StateType {

  constructor(id, name, mod, handler, jobtype, system) {

    this.id = id
    this.name = name
    this.module = mod
    this.jobtype = jobtype
    this.handler = handler
    this.system = system
    this.dependence = 'nan'
  }

  getId() {
    return this.id
  }
  setName(name) {
    this.name = name;
  }
  setJobtype(jobtype) {
    this.jobtype = jobtype;
  }
  setModule(moduletype) {
    this.module = moduletype;
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
  getSystem() {
    return this.system
  }
  getDependence() {
    return this.dependence
  }
}

export default StateType
