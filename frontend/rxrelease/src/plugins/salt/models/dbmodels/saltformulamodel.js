
class SaltFormulaModel {

    static newSaltFormula(_id,_name,_file,_status) {
      return {
        id: _id,
        name: _name,
        file: _file,
        status: _status,
        getName() { return this.name },
        getFile() { return this.file },
        getStatus() { return this.status },
        getId() { return this.id }

      }
    }
  static emptySaltFormula() {
    return SaltFormulaModel.newSaltFormula(null,"","","")
  }
}

export default SaltFormulaModel;
