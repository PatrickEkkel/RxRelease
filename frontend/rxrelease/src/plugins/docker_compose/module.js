import React from 'react';
import { connect } from 'react-redux'
import DockerComposeConfigurationPanel from './configuration/dockercomposeconfiguration';
class Module {

constructor() {

}

name()  {
  return "Dockercompose"
}

hasConfigurationTab() {
  return false;
}

getProfileConfigurationPanel(name) {
  var panels = []
  return panels['DOCKERCOMPOSE_CONFIGURATIONPANEL'] = <DockerComposeConfigurationPanel/>
}

getConfigurationPanel(name) {
  var panels = []
  return panels['DOCKERCOMPOSE_CONFIGURATIONPANEL'] = <DockerComposeConfigurationPanel/>

}
}

export default Module;
