import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from '../../../components/panels/BasicRxComponentPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import  * as wizardActionCreators from '../../../redux/wizardactioncreators'

class SelectNewOrExisting extends BasicRxComponentPanel {

setRadioSelection(e) {
    this.setState({selectedRadioValue: e.target.value})
}


render() {

  return <div className="container"><h4>Create new or existing Salt host?</h4>
    <div className="radio-inline">
      <label><input type="radio" name="newSaltMaster" value="New" onChange={(e) => this.setRadioSelection(e)}/>New Salt Master</label>
    </div>
    <div className="radio-inline">
      <label><input type="radio" value="Existing" name="existingSaltMaster" onChange={(e) => this.setRadioSelection(e)}/>Existing Salt Master</label>
    </div>
  </div>
}

componentWillReceiveProps(nextProps) {

  var type = nextProps.type;

  if(type == 'LOAD_NEXT_WIZARD_ITEM') {
    this.props.dispatch(wizardActionCreators.storeWizardData(this.state.selectedRadioValue))
  }

}

}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedNewOrExisting = connect(mapStateToProps)(SelectNewOrExisting)

export default connectedNewOrExisting
