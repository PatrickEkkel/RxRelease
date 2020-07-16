
class SaltFormulaModel {

    static newSaltFormula(_id, _name, _file, _status) {
      return {
        files: [],
        saltlogs: [],
        id: _id,
        name: _name,
        file: _file,
        status: _status,
        getName() { return this.name },
        getFile() { return this.file },
        getStatus() { return this.status },
        getFiles() { return this.files },
        getSaltlogs() { return this.saltlogs },
        toJson() { return null; },
        getId() { return this.id },
        addSaltLog(saltLog) { this.saltlogs.push(saltLog) },
        addFile(file) { this.files.push(file) }

      }
    }
  static mapSaltFormula(_model) {

    if(_model == null) {
      return SaltFormulaModel.emptySaltFormula()
    }
    else {
      return SaltFormulaModel.newSaltFormula(_model['id'],_model['name'],null,_model['status'])
    }
  }
  static emptySaltFormula() {
    return SaltFormulaModel.newSaltFormula(null,"","","")
  }
}

export default SaltFormulaModel;
