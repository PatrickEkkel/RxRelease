import React from 'react';
import Random from '../lib/random/random.js';

class LabeledDropdown extends React.Component {

  constructor() {
    super()
  }
  getCol() {
    var returnValue =   this.props.col || "col-md-4"

    return returnValue;
  }
  getLabelCol() {
    var returnValue = this.getCol();
    returnValue += " control-label"
    return returnValue;
  }
  getItems() {
    return this.props.items || [];
  }
  getLabel() {
    return this.props.label || "Empty"
  }
  setInternalId(randomId) {
    this.internalId = randomId;
  }
  getInternalId() {
    return this.props.name ||  this.setInternalId(Random.generateRandomId());
  }

  render() {

    var rows = [];
    this.getItems().forEach(function(item) {
      var link = <option value={item}>{item}</option>
      rows.push(link)
    });


    return <fieldset>

      <label className={this.getLabelCol()} for={this.getInternalId()}>{this.getLabel()}</label>
      <div className={this.getCol()}>
        <select id="selectbasic" name={this.getInternalId()} className="form-control">
         {rows}
        </select>
      </div>
    </fieldset>
  }
}
export default LabeledDropdown;
