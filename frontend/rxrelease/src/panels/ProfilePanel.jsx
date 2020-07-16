import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Button from '../components/Button';
import * as profileActionCreators from '../redux/profileactioncreators';
import StandardListConverters from '../converters/StandardListConverters'
import Axios from 'axios';
import { connect } from 'react-redux'

class  ProfilePanel extends BasicRxPanel {
  constructor() {
    super('PROFILES','PROFILEPANEL')
    this.state = {
      profile_name: '',
      inheritedprofile: '',
      profiles: []
    }
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  componentWillMount() {
    this.getLogger().trace("Profiles that can be inherited")
    this.getLogger().traceObject(this.props.profiles)
    this.setState({profiles: this.props.profiles})
  }
  componentWillReceiveProps(nextProps) {
    var type = nextProps.type
    var error_fields = nextProps.error_fields;
    switch(type) {
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
      <div className="form-group row">
        <LabeledDropdown id="inheritedprofile" selectedValue='None' errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.profiles)} label="Profiles" col="col-md-4" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      </form>
   </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    error_fields: state._profiles.error_fields
  }
}

const ConnectedProfilePanel = connect(mapStateToProps)(ProfilePanel)
export default ConnectedProfilePanel;
