import React from 'react';

class LabeledDropdown extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <fieldset>
    <div className="form-group">
      <label className="col-md-4 control-label" for="selectbasic">Select Basic</label>
      <div className="col-md-4">
        <select id="selectbasic" name="selectbasic" className="form-control">
          <option value="1">Option one</option>
          <option value="2">Option two</option>
        </select>
      </div>
    </div>
    </fieldset>
  }
}
export default LabeledDropdown;
