
class SaltFormulaModel {

    static newSaltFormula(_id, _name, _file, _status) {
      return {
        files: [],
        id: _id,
        name: _name,
        file: _file,
        status: _status,
        getName() { return this.name },
        getFile() { return this.file },
        getStatus() { return this.status },
        getFiles() { return this.files },
        toJson() { return null; },
        getId() { return this.id },
        addFile(file) { this.files.push(file) }

      }
    }
  static emptySaltFormula() {
    return SaltFormulaModel.newSaltFormula(null,"","","")
  }
}

export default SaltFormulaModel;
