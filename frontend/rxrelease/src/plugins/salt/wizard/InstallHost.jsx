import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from '../../../components/panels/BasicRxComponentPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import LabeledTextfield from '../../../components/LabeledTextField';
import LabeledTable from '../../../components/LabeledTable'
import StandardListConverters from '../../../converters/StandardListConverters'
import HostFactory from '../../../factories/hostFactory'
import  * as hostActionCreators from '../../../redux/hostactioncreators'
import  * as wizardActionCreators from '../../../redux/wizardactioncreators'

class InstallHost extends BasicRxComponentPanel {


constructor() {
    super('SALTWIZARD','INSTALLHOST')
    this.setState({states: []})
}

onRowClick(entry) {

}

getStates() {
  if(this.state == null) {
    return [];
  }
  else {
    return StandardListConverters.convertListToMap(this.state.states,function(item) {
      var installed = item.getInstalled()

      var installedDisplayString = "NOT INSTALLED"
      if(installed) {
        installedDisplayString =  "INSTALLED"
      }
      var result = [item.getId(),item.getName(),installedDisplayString];
      return result;

    });
  }
}
render() {

  var headers = ['#','name'];

  var states = this.getStates();
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

componentWillReceiveProps(nextProps) {

  var type = nextProps.type;
  var host_management_type = nextProps.hostmanagement_type;
  var current_wizard_item = nextProps.current_wizard_item;
  var selected_host = nextProps.selected_host;
  this.getLogger().debug("Install Host is recieving the following type: " + type + " and the following current_wizard_item: " + current_wizard_item);
  this.getLogger().debug("Host type is currently " + host_management_type)
  if(type == 'LOAD_NEXT_SCREEN' && current_wizard_item == 2 ) {
    var factory = new HostFactory();
    var entry = [7]
    this.props.dispatch(hostActionCreators.loadHostManagement(entry))
    this.props.dispatch(wizardActionCreators.waitForLoad())

  }
  else if(type == 'WAIT_FOR_LOAD' && host_management_type == 'LOAD_HOST_MANAGEMENT_FROM_HOSTS') {
    this.getLogger().trace("host states information:")
    this.getLogger().traceObject(selected_host.states)
    this.setState({states: selected_host.states})
  }
}

}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    hostmanagement_type: state._hostmanagement.type,
    selected_host: state._hostmanagement.selected_host,
    current_wizard_item: state._wizard.current_item,

    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedInstallHost = connect(mapStateToProps)(InstallHost)

export default connectedInstallHost
