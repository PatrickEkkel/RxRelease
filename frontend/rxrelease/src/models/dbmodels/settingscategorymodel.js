

class SettingsCategoryModel {

  static newSettingsCategoryModel(_id,_name) {
    return {
      id: _id,
      name: _name,
      getId: function() { return this.id }
      }
  }
  static mapSettingsCategoryModel(_model) {
    return SettingsCategoryModel.newSettingsCategoryModel(_model.id,_model.name)
  }
}


export default SettingsCategoryModel;
