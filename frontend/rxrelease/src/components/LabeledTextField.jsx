import React from 'react';

class LabeledTextField extends React.Component {
  constructor() {
    super()
  }
  getCol() {
    var returnValue =   this.props.col || "col-md-4"

    return returnValue;
  }
  getLabelCol() {
    var returnValue = this.props.labelcol || "col-md-4"
    returnValue += " control-label"
    return returnValue;
  }
  getLabel() {
    return this.props.label || "Empty"
  }
  getPlaceholder() {
    return this.props.placeholder;
  }

  render() {
    return  <fieldset>

          <label className={this.getLabelCol()} for="textinput">{this.getLabel()}</label>
          <div className={this.getCol()}>
            <input id="textinput" name="textinput" placeholder={this.getPlaceholder()} className="form-control input-md" type="text"/>
          </div>
      </fieldset>
  }
}
export default LabeledTextField;
