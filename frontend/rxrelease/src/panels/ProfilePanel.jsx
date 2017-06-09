import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';

class  ProfilePanel  extends React.Component {
  constructor() {
    super()
  }

  render() {

    var items = ['default'];

    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField placeholder="Profile name" label="Name" col="col-md-2" labelcol="col-md-1"/>
      </div>
      <div className="form-group">
       <LabeledDropdown items={items} label="Type" col="col-md-3" labelcol="col-md-1"/>
      </div>
      </form>
   </div>
  }
}
export default ProfilePanel;