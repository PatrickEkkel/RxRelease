

class SettingsCategory {

  constructor(id,name) {
    this.id = id;
    this.name = name;
    this.settings = [];
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name
  }
  getSettings() {
    return this.settings;
  }
  setSettings(value) {
    this.settings = value;
  }

}

export default SettingsCategory;
