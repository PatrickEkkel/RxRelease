import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';
import Axios from 'axios';

class  ProfilePanel  extends React.Component {
  constructor() {
    super()
    this.state = {
      inputName: '',
      inputType: ''
    }
  }
  changeAttr(e) {
  this.setState({[e.target.name]: e.target.value});
  }
  save() {
    Axios.post('http://localhost:8080/rxbackend/profiles/',
        {
        name: 'Freds Profile',
        type: 'Flintstone'
      });
  }
  render() {
    var items = ['default'];

    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField id="profile_name" placeholder="Profile name" label="Name" col="col-md-2" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledDropdown id="profile_type" items={items} label="Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      </form>
   </div>
  }
}
export default ProfilePanel;
