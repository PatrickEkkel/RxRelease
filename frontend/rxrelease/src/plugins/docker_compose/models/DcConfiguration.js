
class DcConfiguration {

constructor(id,dockercomposeyaml) {

  this.id = id;
  this.yaml = dockercomposeyaml;
  this.configuration = null;
}


setConfiguration(configuration) {
  this.configuration = configuration;
}
getId() {
  return this.id;
}
getYaml() {
  return this.yaml;
}

}

export default DcConfiguration;
