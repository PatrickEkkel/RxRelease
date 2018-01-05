import React from 'react';
import ErrorObject from './models/errorhandling/ErrorObject';

class LabeledTextField extends React.Component {
  constructor() {
    super()
  }
  getCol() {
    var returnValue =   this.props.col || "col-md-4"

    return returnValue;
  }
  getId() {
    return this.props.id;
  }

  getMode() {
    var result = "text"
    if(this.props.mode != null) {
      result = this.props.mode
    }
    return result
  }
  getLabelCol() {
    var returnValue = this.props.labelcol || "col-md-4 "
    returnValue += " control-label"
    return returnValue;
  }
  getLabel() {
    return this.props.label || "Empty"
  }
  getError() {
    if(this.props.error != null) {
      return this.props.error
    }
    else {
      return false;
    }
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
  getId() {
    return this.props.id;
  }
  getErrorText() {
    return this.props.errortext
  }
  getPlaceholder() {
    return this.props.placeholder;
  }
  getOnchange() {
    return this.props.onChange;
  }
  getInputValue() {
    return this.props.inputValue;
  }

  getErrorHandler() {
    return this.props.errorHandler;
  }
  setErrorText(errortext) {
    this.errorText = errortext;
  }
  getErrorText() {
    return this.errorText;
  }

  render() {
    var errorHandler = this.getErrorHandler();
    var errorText = ""
    var error = false;

    if(errorHandler != null) {
      errorHandler(this.getId(),this);
      errorText = this.getErrorText();
      error = false
      if(errorText != "") {
        error = true
      }
    }
    // do legacy error handling
    else {
      // TODO: de oude methoden moeten wel verwijderd worden zodra deze methode volledige geimplementeerd is
      error = this.getError();
      errorText = this.getErrorText();
    }

    return  <fieldset>

          <label className={this.getLabelCol()} for={this.getId()}>{this.getLabel()}</label>
          <div className={this.getCol() + " " + this.getErrorLabel()}>
            <input id={this.getId()} name={this.getId()} placeholder={this.getPlaceholder()} className="form-control input-md has-error" type={this.getMode()} value={this.getInputValue()} onChange={this.getOnchange()}/>
            { error ? <span class="help-block">{this.getErrorText()}</span> : null}
          </div>
      </fieldset>
  }
}
export default LabeledTextField;
