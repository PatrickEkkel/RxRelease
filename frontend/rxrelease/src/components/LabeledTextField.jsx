import React from 'react';

class LabeledTextField extends React.Component {
  constructor() {
    super()
  }

  render() {
    return  <fieldset>
        <div className="form-group">
          <label className="col-md-4 control-label" for="textinput">Text Input</label>
          <div className="col-md-4">
            <input id="textinput" name="textinput" placeholder="placeholder" className="form-control input-md" type="text"/>
          </div>
        </div>
      </fieldset>
  }
}
export default LabeledTextField;
