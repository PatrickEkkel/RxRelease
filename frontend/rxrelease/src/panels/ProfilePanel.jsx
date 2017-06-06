import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';

class  ProfilePanel  extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div className="container">
      <form className="form-horizontal">
      <LabeledTextField/>
      <LabeledDropdown/>  
      </form>
   </div>
  }
}
export default ProfilePanel;
