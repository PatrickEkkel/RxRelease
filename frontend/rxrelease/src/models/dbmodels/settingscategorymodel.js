

class SettingsCategoryModel {

  static newSettingsCategoryModel(_id,_name,_prefix) {
    return {
      id: _id,
      name: _name,
      prefix: _prefix,
      getId: function() { return this.id },
      getName: function() { return this.name },
      getPrefix: function() { return this.prefix }
      }
  }
  static mapSettingsCategoryModel(_model) {
    return SettingsCategoryModel.newSettingsCategoryModel(_model.id,_model.name,_model.prefix)
  }
}


export default SettingsCategoryModel;
