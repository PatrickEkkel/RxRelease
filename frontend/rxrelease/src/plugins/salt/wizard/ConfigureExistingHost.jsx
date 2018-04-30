import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from '../../../components/panels/BasicRxComponentPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import LabeledTextfield from '../../../components/LabeledTextField';

class ConfigureExistingHost extends BasicRxComponentPanel {

render() {

  return <div className="container"><h4>Enter the connection data for the existing saltmaster</h4>
    <div className="form-group row">
     <LabeledTextfield label="Hostname" labelcol="col-md-1"/>
    </div>
    <div className="form-group row">
     <LabeledTextfield label="Username" labelcol="col-md-1"/>
    </div>
    <div className="form-group row">
     <LabeledTextfield label="Password" labelcol="col-md-1"/>
    </div>


  </div>
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
const connectedConfigureExistingHost = connect(mapStateToProps)(ConfigureExistingHost)

export default connectedConfigureExistingHost
