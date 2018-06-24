import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from '../../../components/panels/BasicRxComponentPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import LabeledTextfield from '../../../components/LabeledTextField';
import LabeledTable from '../../../components/LabeledTable'
import Button from '../../../components/Button';
import StandardListConverters from '../../../converters/StandardListConverters'
import WizardBasePanel from '../../../components/panels/WizardBasePanel'
import HostFactory from '../../../factories/hostFactory'
import  * as hostActionCreators from '../../../redux/hostactioncreators'
import  * as wizardActionCreators from '../../../redux/wizardactioncreators'

class InstallHost extends WizardBasePanel {


constructor() {
    super('SALTWIZARD','INSTALLHOST',WizardBasePanel.STEP3)
    this.setState({states: []})
}

onRowClick(entry) {

}

getStates() {
  if(this.state == null) {
    return [];
  }
  else if(this.state.states == null) {
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
wizardStepSuccess(nextProps) {


var wizard_data = nextProps.wizard_data;

this.getLogger().trace("wizard step was success")
this.getLogger().traceObject(wizard_data)
this.setState({saved_host: wizard_data.saved_host})
}
waitForSave() {

}
installHost() {
  this.getLogger().trace("intalling the host")
  this.getLogger().traceObject(this.state.saved_host)
  this.props.dispatch(hostActionCreators.installHost(this.state.saved_host))

}
loadNextScreen(nextProps) {
  var selected_host = this.state.saved_host;
  var factory = new HostFactory();
  this.getLogger().trace("selected host: ")
  this.getLogger().traceObject(selected_host)
  var entry = [selected_host.id]
  this.props.dispatch(hostActionCreators.loadHostManagement(entry))
  this.props.dispatch(wizardActionCreators.waitForLoad())
}
waitForLoad(nextProps) {

  var host_management_type = nextProps.hostmanagement_type;
  var selected_host = nextProps.selected_host;

  if(host_management_type == 'LOAD_HOST_MANAGEMENT_FROM_HOSTS') {
    this.getLogger().trace("selected_host information:")
    this.getLogger().traceObject(selected_host)

    this.getLogger().trace("host states information:")
    this.getLogger().traceObject(selected_host.states)
    this.setState({states: selected_host.states})
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
        <Button title="Install Host"  onClick={() => this.installHost()}/>

  </div>
}

componentWillReceiveProps(nextProps) {

  var type = nextProps.type;
  var host_management_type = nextProps.hostmanagement_type;
  var host_type = nextProps.host_type;
  var current_wizard_item = nextProps.current_wizard_item;
  var selected_host = nextProps.selected_host;
  this.getLogger().debug("Host management type is currently " + host_management_type)
  this.getLogger().debug("Type is currently: " + type)
  this.getLogger().debug("Host type is currently: " + host_type )
  if(host_type == 'HOST_INSTALLED') {
    this.props.dispatch(wizardActionCreators.updateWizardState('rxsalt_wizard','COMPLETED'))

  }

  super.componentWillReceiveProps(nextProps)
}

}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    hostmanagement_type: state._hostmanagement.type,
    host_type: state._host.type,
    selected_host: state._hostmanagement.selected_host,
    current_wizard_item: state._wizard.current_item,
    wizard_data: state._wizard.wizard_data,

    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedInstallHost = connect(mapStateToProps)(InstallHost)

export default connectedInstallHost
