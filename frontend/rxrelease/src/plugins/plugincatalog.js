import SaltModule from './salt/module'
import DockerComposeModule from './docker_compose/module'
import React from 'react';
import { connect } from 'react-redux'

export function _modules(module_name) {

var m = [];

// Register salt module
var salt_module = new SaltModule()
var dockercompose_module = new DockerComposeModule()
m[salt_module.name()] = salt_module
m[dockercompose_module.name()] = dockercompose_module

return m[module_name]

}
