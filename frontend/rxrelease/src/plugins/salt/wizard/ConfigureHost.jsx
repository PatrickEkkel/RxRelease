import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import WizardBasePanel from '../../../components/panels/WizardBasePanel'
import LabeledDropdown from '../../../components/LabeledDropdown';
import LabeledTextfield from '../../../components/LabeledTextField';
import Button from '../../../components/Button';
import HostModel from '../../../models/dbmodels/hostmodel'
import  * as hostActionCreators from '../../../redux/hostactioncreators'
import  * as wizardActionCreators from '../../../redux/wizardactioncreators'
import  * as profileActionCreators from '../../../redux/profileactioncreators'
import  * as settingsActionCreators from '../../../redux/settingsactioncreators'
import  * as saltWizardActionCreators from '../wizard/redux/saltwizardactioncreators'

class ConfigureHost extends WizardBasePanel {

constructor() {
  super('SALTWIZARD','CONFIGUREHOST',WizardBasePanel.STEP2)
  this.setState({stepCompleted: false,profileTypeId: null,selectedRadioValue: null})
}

saveFormData() {

 // TODO: hier moeten we een factoryobject inzetten om een host object te maken
 var host = HostModel.newHost(this.state.hostname,this.state.ipaddress,"Salt Master",this.state.profileTypeId.id)
 this.props.dispatch(saltWizardActionCreators.saveConfigureHost(host))
 this.props.dispatch(wizardActionCreators.waitForSave())
}
saveHost() {
  this.props.dispatch(hostActionCreators.saveNewHost(this.state.hostname,this.state.ipaddress,"Salt Master",this.state.profileTypeId.id))
  //this.props.dispatch(wizardActionCreators.waitForSave())
}
saveSettings() {
  this.getLogger().debug("creating or loading new category from server: " + this.state.hostname)
  this.props.dispatch(settingsActionCreators.saveOrLoadNewCategory(this.state.hostname))
}

storeWizardData(current_wizard_item) {
  this.getLogger().trace("Profiletype ID: ")
  this.getLogger().traceObject(this.state.profileTypeId)
  this.setState({current_wizard_item: 2})
  this.saveFormData()
}

waitForSave(nextProps) {

var host_type = nextProps.host_type;
var settings_type = nextProps.settings_type
var error_fields = nextProps.error_fields;
var saved_host = nextProps.saved_host;
this.getLogger().debug("curent panel state: " + host_type)
  if(host_type == 'SAVE_NEW_HOST') {
    //alert('komt hij hier!')
    this.props.dispatch(wizardActionCreators.storeWizardDataSuccess(this.state.current_wizard_item,{saved_host: saved_host}))
    this.setState({stepCompleted: true})
    this.getLogger().debug("Wait for save is working!")
  }
  /*if(settings_type == 'SAVE_NEW_SETTING_CATEGORY' || settings_type == 'LOAD_EXISTING_SETTING_CATEGORY') {
    alert(nextProps.type)
    //this.saveHost()
  }*/
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
  this.getLogger().debug("Configure host is recieving props")
  this.getLogger().debug("Current type: " + nextProps.type)
  this.getLogger().debug("Current Wizard Item: " + current_wizard_item)
  super.componentWillReceiveProps(nextProps)

  if(type == 'PROFILE_TYPES_LOADED') {
    this.getLogger().trace("Loaded profiletypes:")
    this.getLogger().traceObject(profiletypes)
    this.setState({stepCompleted: false, profileTypeId: profiletypes[0]})
  }

}
render() {

  var { type } = this.props

  var configureHostText = ""
  var configureSaltApiText = ""
  if(this.state != null && this.state.selectedRadioValue == "New") {
    configureHostText = <h4>Enter the connection data for the new saltmaster</h4>
    configureSaltApiText = <h4>Enter the credentials for the new salt-api</h4>
  }
  else if(this.state != null && this.state.selectedRadioValue == "Existing") {
    configureHostText = <h4>Enter the connection data for the existing saltmaster</h4>
    configureSaltApiText = <h4>Enter the connection data for the existing saltmaster</h4>
  }
  return <div><div className="container">{configureHostText}
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
     <LabeledTextfield id="password" mode="password" label="Password" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
  </div>
  <div className="container">{configureSaltApiText}
    <div className="form-group row">
     <LabeledTextfield id="saltapi_username" label="Salt-api username" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
    <div className="form-group row">
     <LabeledTextfield id="saltapi_password" label="Salt-api password" errorHandler={(id,callee) => this.handleError(id,callee)}  labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
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
    settings_type: state._settings.type,
    profiletypes: state._wizard.profiletypes,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedConfigureHost = connect(mapStateToProps)(ConfigureHost)

export default connectedConfigureHost
