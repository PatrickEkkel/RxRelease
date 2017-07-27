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
  getId() {
    return this.props.id;
  }
  getLabelCol() {
    var returnValue = this.props.labelcol || "col-md-4"
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
  getOnchange() {
    return this.props.onChange;
  }

  render() {
    var noneoption = <option value='None'>None</option>
    var rows = [];

    rows.push(noneoption)

    this.getItems().forEach(function(item) {
      var link = <option value={item}>{item}</option>
      rows.push(link)
    });


    return <fieldset>

      <label className={this.getLabelCol()} >{this.getLabel()}</label>
      <div className={this.getCol()}>
        <select id={this.getId()} name={this.getId()} className="form-control" onChange={this.getOnchange()}>
         {rows}
        </select>
      </div>
    </fieldset>
  }
}
export default LabeledDropdown;
