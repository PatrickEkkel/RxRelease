import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from '../../../components/panels/BasicRxComponentPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import LabeledTextfield from '../../../components/LabeledTextField';
import LabeledTable from '../../../components/LabeledTable'

class InstallHost extends BasicRxComponentPanel {

onRowClick(entry) {

}

render() {

  var headers = ['#','name'];
  var states = []
  function handleLabelLoad(entry) {
      if(entry[2] == "NOT INSTALLED") {
        return "label-important label"
      }else {
        return "label-success label"
      }

  }
  return <div className="container">
        <LabeledTable onLabelLoad={handleLabelLoad} labelText="Status" headers = {headers} data={states} onRowClick={(entry) => this.onRowClick(entry)}/>
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
const connectedInstallHost = connect(mapStateToProps)(InstallHost)

export default connectedInstallHost
