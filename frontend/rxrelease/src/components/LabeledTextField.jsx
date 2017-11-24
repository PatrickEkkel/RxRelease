import React from 'react';

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
    if(this.props.error) {
      return "has-error"
    }
    else if(this.props.error == null) {
      return " "
    }
    else {
      return "has-success"
    }
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

  render() {

    return  <fieldset>

          <label className={this.getLabelCol()} for={this.getId()}>{this.getLabel()}</label>
          <div className={this.getCol() + " " + this.getErrorLabel()}>
            <input id={this.getId()} name={this.getId()} placeholder={this.getPlaceholder()} className="form-control input-md has-error" type={this.getMode()} value={this.getInputValue()} onChange={this.getOnchange()}/>
            { this.getError() ? <span class="help-block">{this.getErrorText()}</span> : null}
          </div>
      </fieldset>
  }
}
export default LabeledTextField;
