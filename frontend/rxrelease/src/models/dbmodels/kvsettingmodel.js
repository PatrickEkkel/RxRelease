

class KVSettingModel {

  static newKVSetting(_id,_key,_value,_category) {
    return {
      id: _id,
      key: _key,
      value: _value,
      category: _category,
      getId: function() { return this.id },
      getKey: function() { return this.key },
      getValue: function() { return this.value },
      getCategory: function() { return this.category },
      setCategory: function(category) { this.category = category}
    }
  }
  static emptyKVSetting() {
    return KVSettingModel.newKVSetting(null,"","","")
  }
  static mapKVSetting(_model) {
    if(_model == null) {
      return KVSettingModel.emptyKVSetting()
    }
    else {
      return KVSettingModel.newKVSetting(_model['id'],_model['key'], _model['value'], null)
    }
  }
}

export default KVSettingModel
