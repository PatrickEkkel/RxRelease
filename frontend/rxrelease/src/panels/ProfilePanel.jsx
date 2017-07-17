import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';
import  * as actionCreators from '../redux/actioncreators'
import Axios from 'axios';
import { connect } from 'react-redux'

class  ProfilePanel  extends React.Component {
  constructor() {
    super()
    this.state = {
      profile_name: '',
      profile_type: ''
    }
  }
  changeAttr(e) {
    this.props.changeAttr(e);
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

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    reduxState: state,
  }
}

const ConnectedProfilePanel = connect(mapStateToProps)(ProfilePanel)
export default ConnectedProfilePanel;
