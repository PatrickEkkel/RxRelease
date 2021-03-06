import React from 'react';
import StandardListConverters from '../converters/StandardListConverters'
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import  * as profileActionCreators from '../redux/profileactioncreators';
import  * as actionCreators from '../redux/actioncreators'
import Axios from 'axios';
import { connect } from 'react-redux'

class  HostPanel  extends BasicRxPanel {
  constructor() {
    super('HOSTS','HOSTPANEL');
    this.state = { profiles: [] }
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  componentWillMount() {
    this.getLogger().debug("current received state: " + type)

    var {type} = this.props;
    switch(type) {

      case 'OPEN_NEW_HOST':
        this.props.dispatch(profileActionCreators.loadProfiles())
      break;
    }
  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;

    this.getLogger().debug("current received state: " + type)
    switch(type) {
      case 'SAVE_NEW_HOST_FAILED':
          this.setState({error_fields: error_fields,success: false});
        break;
      case 'PROFILE_TYPES_LOADED':
          this.setState({profiletypes: nextProps.profiletypes})
        break;
      case 'PROFILES_LOADED':
        this.getLogger().trace('Loaded profiles')
        this.getLogger().traceObject(nextProps.profiles)
        this.setState({profiles: nextProps.profiles})
      break;
    }
  }

  render() {
    var items = ['default'];

    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField id="hostname" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Hostname" label="Hostname" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledTextField id="ipaddress" errorHandler={(id,callee) => this.handleError(id,callee)}  placeholder="IP Address" label="IP Address" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledTextField id="description" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Description" label="Description" col="col-md-4" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
        <LabeledDropdown id="profile" selectedValue='None' errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.profiles)} label="Profiles" col="col-md-4" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      </form>
   </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._host.type,
    reduxState: state,
    profiles: state._host.profiles,
    error_fields: state._host.error_fields,
  }
}

const ConnectedHostPanel = connect(mapStateToProps)(HostPanel)
export default ConnectedHostPanel;
