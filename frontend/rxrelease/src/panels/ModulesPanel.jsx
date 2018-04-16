import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel'
import SaltInstallWizard from '../plugins/salt/SaltInstallWizard'
// make a
class  ModulesPanel  extends BasicRxPanel {
  constructor() {
    super("MODULES","MODULESPANEL")
  }

  render() {

    return <div><SaltInstallWizard/></div>
  }
}


export default ModulesPanel;
