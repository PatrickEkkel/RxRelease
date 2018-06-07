import React from 'react';
import LogFactory from '../../logging/LogFactory';


class BasicRxComponentPanel extends React.Component {

// TODO: het nu van dit component opnieuw bekijken.. lijkt overbodig te zijn en te zorgen voor codeduplicatie
constructor(component,subcomponent) {
super()
this.component = component;
this.subcomponent = subcomponent;

var logfactory = new LogFactory();
this.logger = logfactory.createLogger(this.component,this.subcomponent);
}

changeAttr(e) {
  this.getLogger().debug("changeAttr called with the following parameters")
  this.getLogger().debug("e.target.id: " + e.target.id + " " + "e.target.value: " + e.target.value)

  this.setState({[e.target.id]: e.target.value});
}
getErrorText() {
  return this.errorText;
}
getLogger() {
  return this.logger;
}
setErrorText(errortext) {
  this.errorText = errortext;
}
getErrorHandler() {
  return this.props.errorHandler;
}
getErrorLabel() {
  // TODO: at the moment we have no way of filtering out individual errors, therefore we disable this for the time being
  if(this.props.error) {
    //return "has-error"
    return " "
  }
  else if(this.props.error == null) {
    return " "
  }
  else {
    //return "has-success"
    return " "
  }
}

}

export default BasicRxComponentPanel;
