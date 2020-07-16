import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel'
// TODO: dit is niet goed, een verwijzing naar een plugin element midden in de core code!
import SaltInstallWizard from '../plugins/salt/SaltInstallWizard'
// make a
class  ModulesPanel extends BasicRxPanel {
  constructor() {
    super("MODULES","MODULESPANEL")
  }

  render() {

    return <div><SaltInstallWizard/></div>
  }
}


export default ModulesPanel;
