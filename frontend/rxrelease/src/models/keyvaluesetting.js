
class KeyValueSetting {

constructor(id,key,value,category_id) {
  this.id = id;
  this.key = key;
  this.value = value;
  this.category_id = category_id;
}

getKey() {
  return this.key;
}
getValue() {
  return this.value;
}
getId() {
  return this.id;
}
getCategoryId() {
  return this.category_id;
}
}

export default KeyValueSetting;
