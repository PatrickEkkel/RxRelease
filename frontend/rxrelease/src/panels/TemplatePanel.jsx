import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';

class  TemplatePanel  extends React.Component {
  constructor() {
    super()
  }

  render() {

    var items = ['default'];

    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group">
       <LabeledTextField placeholder="Profile name" label="Name"/>
      </div>
      <div className="form-group">
       <LabeledDropdown items={items} label="Type"/>
      </div>
      <div className="form-group">
      <label className="col-md-4 control-label" for="textinput"/>
      <div className="col-md-4 "><Button title="Save"/> <Button title="Cancel"/></div>
      </div>

      </form>
   </div>
  }
}
export default TemplatePanel;
