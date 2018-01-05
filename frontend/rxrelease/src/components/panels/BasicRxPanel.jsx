import LogFactory from '../../logging/LogFactory';
import React from 'react';


class BasicRxPanel extends React.Component {


constructor(component,subcomponent) {
super()
this.component = component;
this.subcomponent = subcomponent;

var logfactory = new LogFactory();
this.logger = logfactory.createLogger(this.component,this.subcomponent);
}

getLogger() {
  return this.logger;
}
changeAttr(e) {
  this.setState({[e.target.id]: e.target.value});
}

handleError(component_id,callee) {

var formSaveState = this.state.success;

if(formSaveState != null && formSaveState == false) {

// TODO: time to handle those damn errors, otherwise continue on doing nothing
this.getLogger().debug("render form error state");
this.getLogger().traceObject(this.state.error_fields)
// fetch the component id
var errorMessage = this.state.error_fields[0][component_id][0];

//for(var i=0;i<this.state.error_fields.length;i++) {
//  this.getLogger().traceObject(this.state.error_fields[i])
//}

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
