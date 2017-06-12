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
  getOnchange() {
    return this.props.onChange;
  }

  render() {

    return  <fieldset>

          <label className={this.getLabelCol()} for={this.getId()}>{this.getLabel()}</label>
          <div className={this.getCol()}>
            <input id={this.getId()} name={this.getId()} placeholder={this.getPlaceholder()} className="form-control input-md" type="text" onChange={this.getOnchange()}/>
          </div>
      </fieldset>
  }
}
export default LabeledTextField;
