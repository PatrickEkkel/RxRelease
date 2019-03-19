

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
      getCategory: function() { return this.category }
    }
  }
}

export default KVSettingModel
