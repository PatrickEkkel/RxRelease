import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';
import * as profileActionCreators from '../redux/profileactioncreators';
import ProfileTypeFactory from '../factories/profiletypeFactory'
import Axios from 'axios';
import { connect } from 'react-redux'

class  ProfilePanel  extends React.Component {
  constructor() {
    super()
    this.state = {
      profile_name: '',
      profile_type: '',
      profiletypes: []
    }
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  componentWillMount() {

    var {type} = this.props;

    switch(type) {

      case 'OPEN_NEW_PROFILE':
        this.props.dispatch(profileActionCreators.loadProfiletypes())
      break;
    }
  }
  componentWillReceiveProps(nextProps) {

    switch(nextProps.type) {

      case 'PROFILE_TYPES_LOADED':
        this.setState({profiletypes: nextProps.profiletypes})
      break;

    }

  }
  render() {
    var items = [];
    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField id="profile_name" placeholder="Profile name" label="Name" col="col-md-2" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledDropdown id="profile_type" items={ProfileTypeFactory.convertProfiletypeListToDictionary(this.state.profiletypes)} label="Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      </form>
   </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    profiletypes: state._profiles.profiletypes
  }
}

const ConnectedProfilePanel = connect(mapStateToProps)(ProfilePanel)
export default ConnectedProfilePanel;
