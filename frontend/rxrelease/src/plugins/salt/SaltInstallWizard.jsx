import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../components/panels/BasicRxPanel';
import Wizard from '../../components/Wizard'
import SelectNewOrExisting from './wizard/SelectNewOrExisting';
import ConfigureHost from './wizard/ConfigureHost';
import InstallHost from './wizard/InstallHost';
import  * as wizardActionCreators from '../../redux/wizardactioncreators'

class SaltInstallWizard extends BasicRxPanel {

  constructor() {
    super('SALT','INSTALL_WIZARD')
    this.state = {
      show_wizard: true
    }
  }

  componentWillMount() {
    // TODO: hier was ik gebleven
  //  this.props.dispatch(wizardActionCreators.)
  this.props.dispatch(wizardActionCreators.loadWizardState('rxsalt_wizard'))


  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var wizard_state =  nextProps.wizard_state;

    if(type == 'WIZARD_STATE_LOADED') {
      this.getLogger().trace("wizard_state")
      this.getLogger().traceObject(wizard_state)

      if(wizard_state['wizard_status'] == 'COMPLETED') {
        this.setState({show_wizard: false})
      }
    }

  }

  render() {

    if(this.state.show_wizard) {

      var disabled_previous = [3];
      var step1 = <SelectNewOrExisting/>
      var step2 = <ConfigureHost/>
      var step3 = <InstallHost/>
      var items = { 'Salt Master Installation': step1,'Select Host': step2,'Install Host': step3}
        return <Wizard items={items} />
    }
    else {
      return <div>Wizard already completed</div>
    }
  }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    wizard_state: state._wizard.wizard_state,

    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedSaltInstallWizard = connect(mapStateToProps)(SaltInstallWizard)

export default connectedSaltInstallWizard
