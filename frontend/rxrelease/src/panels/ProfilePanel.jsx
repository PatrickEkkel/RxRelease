import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Button from '../components/Button';
import * as profileActionCreators from '../redux/profileactioncreators';
import ProfileTypeFactory from '../factories/profiletypeFactory'
import StandardListConverters from '../converters/StandardListConverters'
import Axios from 'axios';
import { connect } from 'react-redux'

class  ProfilePanel  extends BasicRxPanel {
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
    var type = nextProps.type
    var error_fields = nextProps.error_fields;
    switch(type) {

      case 'PROFILE_TYPES_LOADED':
        this.setState({profiletypes: nextProps.profiletypes})
      break;
      case 'SAVE_NEW_PROFILE_FAILED':
       this.setState({error_fields: error_fields, success: false})
      break;
    }

  }
  render() {
    var items = [];
    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField id="name" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Profile name" label="Name" col="col-md-2" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledDropdown id="profiletype" errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.profiletypes)} label="Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      </form>
   </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    profiletypes: state._profiles.profiletypes,
    error_fields: state._profiles.error_fields
  }
}

const ConnectedProfilePanel = connect(mapStateToProps)(ProfilePanel)
export default ConnectedProfilePanel;
