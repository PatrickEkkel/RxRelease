import React from 'react';
import { connect } from 'react-redux'
import SaltConfigurationPanel from '../../plugins/salt/configuration/saltconfiguration';
import StateTypeConfigurationPanel from '../../plugins/salt/statetype/statetypeConfiguration'
class Module {

constructor() {

}

name()  {
  return "Salt"
}

module() {
  return "rxsalt"
}

hasConfigurationTab() {
  return true;
}

getProfileConfigurationPanel(name) {
  var panels = []
  return panels['SALT_CONFIGURATION_PANEL'] = <SaltConfigurationPanel/>
}

getConfigurationPanel(name) {

var panels = []
return panels['SALT_CONFIGURATION_PANEL'] = <SaltConfigurationPanel/>

}

getStatetypePanel(name) {
  var panels = []
  return panels['SALT_STATETYPE_PANEL'] = <StateTypeConfigurationPanel/>
}
}

export default Module;
