import React from 'react';


class BasicRxComponentPanel extends React.Component {


constructor(component,subcomponent) {
super()
}
getErrorText() {
  return this.errorText;
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
