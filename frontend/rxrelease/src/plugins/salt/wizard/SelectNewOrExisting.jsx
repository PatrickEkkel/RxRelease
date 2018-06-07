import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import  * as wizardActionCreators from '../../../redux/wizardactioncreators'

class SelectNewOrExisting extends BasicRxPanel {

constructor() {
  super('SALTWIZARD','NEWOREXISTING')
  this.setState({stepCompleted: false})
}

setRadioSelection(e) {
    this.setState({selectedRadioValue: e.target.value,stepCompleted: true})
}


render() {

  return <div className="container"><h4>Create new or existing Salt host?</h4>
    <div className="radio-inline">
      <label><input type="radio" name="saltchoice" value="New" onChange={(e) => this.setRadioSelection(e)}/>New Salt Master</label>
    </div>
    <div className="radio-inline">
      <label><input type="radio" value="Existing" name="saltchoice" onChange={(e) => this.setRadioSelection(e)}/>Existing Salt Master</label>
    </div>
  </div>
}

componentWillReceiveProps(nextProps) {

  var type = nextProps.type;
  var current_wizard_item = nextProps.current_wizard_item;
  var host_type = nextProps.host_type
  this.getLogger().debug("Is current step completed: " + this.state.stepCompleted)
  this.getLogger().debug("Current wizard item: " + current_wizard_item)
  // gewoon doorsturen naar het volgende scherm
  if(type == 'STORE_WIZARD_DATA' && current_wizard_item == 1) {

    if(this.state.stepCompleted) {
      this.getLogger().debug("Storing the current data")
      this.props.dispatch(wizardActionCreators.storeWizardDataSuccess(current_wizard_item,this.state.selectedRadioValue))
    }
  }

}

}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    current_wizard_item: state._wizard.current_item,
    host_type: state._host.type,

    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedNewOrExisting = connect(mapStateToProps)(SelectNewOrExisting)

export default connectedNewOrExisting
