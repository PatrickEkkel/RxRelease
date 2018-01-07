import React from 'react';
import Random from '../lib/random/random.js';
import BasicRxComponentPanel from './panels/BasicRxComponentPanel';


class LabeledDropdown extends BasicRxComponentPanel {

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

    var noneoption = <option key="None" value='None'>None</option>
    var rows = [];

    rows.push(noneoption)

    this.getItems().forEach(function(item) {
      var link = <option key={item['id']} value={item['id']}>{item['name']}</option>
      rows.push(link)
    });


    return <fieldset>

      <label className={this.getLabelCol()} >{this.getLabel()}</label>
      <div className={this.getCol()}>
        <select id={this.getId()} name={this.getId()} className="form-control" onChange={this.getOnchange()}>
         {rows}
        </select>
        { error ? <span class="help-block">{this.getErrorText()}</span> : null}
      </div>
    </fieldset>
  }
}
export default LabeledDropdown;
