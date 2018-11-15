import React from 'react';
import { connect } from 'react-redux'
import SaltConfigurationPanel from '../../plugins/salt/configuration/saltconfiguration';
class Module {

constructor() {

}

name()  {
  return "Salt"
}

getPanel(name) {

var panels = []
return panels['SALT_CONFIGURATION_PANEL'] = <SaltConfigurationPanel/>

}
}

export default Module;
