import SaltModule from './salt/module'
import React from 'react';
import { connect } from 'react-redux'

export function _modules(module_name) {

var m = [];

// Register salt module
var salt_module = new SaltModule()
m[salt_module.name()] = salt_module

return m[module_name]

}
