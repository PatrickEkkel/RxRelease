import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import WizardBasePanel from '../../../components/panels/WizardBasePanel'
import LabeledDropdown from '../../../components/LabeledDropdown';
import LabeledTextfield from '../../../components/LabeledTextField';
import Button from '../../../components/Button';
import  * as hostActionCreators from '../../../redux/hostactioncreators'
import  * as wizardActionCreators from '../../../redux/wizardactioncreators'
import  * as profileActionCreators from '../../../redux/profileactioncreators'

class ConfigureHost extends WizardBasePanel {

constructor() {
  super('SALTWIZARD','CONFIGUREHOST',WizardBasePanel.STEP2)
  this.setState({stepCompleted: false,profileTypeId: null,selectedRadioValue: null})
}

saveHost() {
 this.props.dispatch(hostActionCreators.saveNewHost(this.state.hostname,this.state.ipaddress,"Salt Master",this.state.profileTypeId.id))
 this.props.dispatch(wizardActionCreators.waitForSave())
}

storeWizardData(current_wizard_item) {
  this.getLogger().trace("Profiletype ID: ")
  this.getLogger().traceObject(this.state.profileTypeId)
  this.setState({current_wizard_item: 2})
  this.saveHost()
}

waitForSave(nextProps) {

var host_type = nextProps.host_type;
var error_fields = nextProps.error_fields;
var saved_host = nextProps.saved_host;
  if(host_type == 'SAVE_NEW_HOST') {
    //alert('komt hij hier!')
    this.props.dispatch(wizardActionCreators.storeWizardDataSuccess(this.state.current_wizard_item,{saved_host: saved_host}))
    this.setState({stepCompleted: true})
    this.getLogger().debug("Wait for save is working!")
  }
  else if(host_type == 'SAVE_NEW_HOST_FAILED') {
    this.getLogger().debug("Persisting the failed, because of validation failures")
    this.setState({error_fields: error_fields,success: false});
  }
}
waitForLoad(nextProps) {

}

loadNextScreen(nextProps) {
  this.getLogger().trace("Current selected radio value: ")
  this.getLogger().traceObject(this.state.selectedRadioValue)
  alert(this.state.selectedRadioValue)
  if(this.state.selectedRadioValue == 'New') {
    this.props.dispatch(profileActionCreators.loadProfiletypeByName("Salt Master"))
  }
  else if(this.state.selectedRadioValue == 'Existing') {
    this.props.dispatch(profileActionCreators.loadProfiletypeByName("Default"))
  }
}

wizardStepSuccess(nextProps) {
  var wizard_data = nextProps.wizard_data
  this.getLogger().trace("Recieving values from previous wizard screen")
  this.getLogger().traceObject(wizard_data)
  this.setState({selectedRadioValue: wizard_data})
}

componentWillReceiveProps(nextProps) {
  var type = nextProps.type;
  var host_type = nextProps.host_type
  var current_wizard_item = nextProps.current_wizard_item
  var error_fields =  nextProps.error_fields
  var profiletypes = nextProps.profiletypes
  var wizard_data = nextProps.wizard_data

  super.componentWillReceiveProps(nextProps)

  this.getLogger().debug("Configure host is recieving props")
  this.getLogger().debug("Current type: " + nextProps.type)
  this.getLogger().debug("Current Wizard Item: " + current_wizard_item)

  if(type == 'PROFILE_TYPES_LOADED') {
    this.getLogger().trace("Loaded profiletypes:")
    this.getLogger().traceObject(profiletypes)
    this.setState({stepCompleted: false, profileTypeId: profiletypes[0]})
  }

}
render() {

  var { type } = this.props

  var configureHostText = ""
  if(this.state != null && this.state.selectedRadioValue == "New") {
    configureHostText = <h4>Enter the connection data for the new saltmaster</h4>
  }
  else if(this.state != null && this.state.selectedRadioValue == "Existing") {
    configureHostText = <h4>Enter the connection data for the existing saltmaster</h4>
  }
  return <div className="container">{configureHostText}
    <div className="form-group row">
     <LabeledTextfield id="hostname" label="Hostname" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
    <div className="form-group row">
      <LabeledTextfield id="ipaddress" label="IP Address" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
    <div className="form-group row">
     <LabeledTextfield id="username" label="Username" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
    <div className="form-group row">
     <LabeledTextfield id="password" label="Password" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
  </div>
}

}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    current_wizard_item: state._wizard.current_item,
    saved_host: state._host.saved_host,
    wizard_data: state._wizard.wizard_data,
    error_fields: state._host.error_fields,
    host_type: state._host.type,
    profiletypes: state._wizard.profiletypes,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedConfigureHost = connect(mapStateToProps)(ConfigureHost)

export default connectedConfigureHost
