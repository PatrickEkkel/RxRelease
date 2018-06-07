

import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../components/panels/BasicRxPanel';
import Wizard from '../../components/Wizard'
import SelectNewOrExisting from './wizard/SelectNewOrExisting';
import ConfigureHost from './wizard/ConfigureHost';
import InstallHost from './wizard/InstallHost';


class SaltInstallWizard extends BasicRxPanel {

  constructor() {
    super()
  }


  render() {

    var step1 = <SelectNewOrExisting/>
    var step2 = <ConfigureHost/>
    var step3 = <InstallHost/>
    var items = { 'Salt Master Installation': step1,'Select Host': step2,'Install Host': step3}
      return <Wizard items={items}/>
  }
}

export default SaltInstallWizard;
