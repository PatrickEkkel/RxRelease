import LogFactory from '../../logging/LogFactory';
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import React from 'react';


class WizardBasePanel extends BasicRxPanel {

constructor(component,subcomponent) {
super(component,subcomponent)
}


componentWillReceiveProps(nextProps) {


  
}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    current_wizard_item: state._wizard.current_item,
    wizard_data: state._wizard.wizard_data,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}



const connectedWizardBasePanel = connect(mapStateToProps)(WizardBasePanel)

export default connectedWizardBasePanel
