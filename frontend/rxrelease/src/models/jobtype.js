

class JobType {

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
  static JobTypes() {
    return [new JobType('SIMPLE_STATE','Simple'),new JobType('REPEATABLE_STATE','Repeatable'),new JobType('COMPLEX_STATE','Complex')]
  }
}

export default JobType
