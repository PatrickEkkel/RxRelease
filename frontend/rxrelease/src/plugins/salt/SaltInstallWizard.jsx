

import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../components/panels/BasicRxPanel';
import Wizard from '../../components/Wizard'
import SelectNewOrExisting from './wizard/SelectNewOrExisting'


class SaltInstallWizard extends BasicRxPanel {

  constructor() {
    super()
  }


  render() {

    var step1 = <SelectNewOrExisting/>
    var items = { 'Salt Master Installation': step1,'Select Host': '2','Install New Host': '3'}
      return <Wizard items={items}/>
  }
}

export default SaltInstallWizard;
