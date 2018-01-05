import LogFactory from '../../logging/LogFactory';
import React from 'react';


class BasicRxPanel extends React.Component {


constructor(component,subcomponent) {
super()
this.component = component;
this.subcomponent = subcomponent;

this.state = { success: null }

var logfactory = new LogFactory();
this.logger = logfactory.createLogger(this.component,this.subcomponent);
}

getLogger() {
  return this.logger;
}
changeAttr(e) {
  this.getLogger().debug("changeAttr called with the following parameters")
  this.getLogger().debug("e.target.id: " + e.target.id + " " + "e.target.value: " + e.target.value)

  this.setState({[e.target.id]: e.target.value});
}

handleError(component_id,callee) {

var formSaveState = this.state.success;


this.getLogger().debug("Current form save state: " + formSaveState)
if(formSaveState != null && formSaveState == false) {

// TODO: time to handle those damn errors, otherwise continue on doing nothing
this.getLogger().debug("render form error state");
this.getLogger().traceObject(this.state.error_fields)
// fetch the component id
var errorMessage = "";

if(typeof this.state.error_fields[0][component_id] !== 'undefined') {
  errorMessage = this.state.error_fields[0][component_id][0];
}

if(typeof errorMessage !== 'undefined' || !errorMessage) {

  this.getLogger().debug("Error message to render")
  this.getLogger().debug("Component ID: " + component_id)
  this.getLogger().debug("Errormessage: " + errorMessage)
  callee.setErrorText(errorMessage)
}

return errorMessage;
}
}

}

export default BasicRxPanel;
