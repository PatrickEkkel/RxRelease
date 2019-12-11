import React from 'react';
import StandardListConverters from '../converters/StandardListConverters'
import JobType from '../models/jobtype'
import ModuleType from '../models/moduletype'
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Axios from 'axios';
import { connect } from 'react-redux'

class StatetypePanel extends BasicRxPanel {
  constructor() {
    super('STATETYPES','STATETYPE_PANEL');

    // objectlist that can be handled by LabeledDropdown
    this.state = {
       jobtypes: [new JobType('SIMPLE_STATE','Simple'),new JobType('REPEATABLE_STATE','Repeatable'),new JobType('COMPLEX_STATE','Complex')],
       moduletypes: [new ModuleType('rxdockercompose','Docker compose'), new ModuleType('rxsalt','Salt')]
     }
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }

  componentWillMount() {
    var {type} = this.props;
    this.getLogger().debug("current received state: " + type)
    switch(type) {
      case 'OPEN_NEW_STATETYPE':
        break;
    }
  }

  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;

    this.getLogger().debug("current received state: " + type)
    switch(type) {
      case 'OPEN_NEW_STATETYPE':
        break;
    }

  }

  render() {
    var items = ['default'];

    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField id="name" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Name" label="name" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledDropdown id="jobtype" errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.jobtypes)} label="Job Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledDropdown id="module" errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.moduletypes)} label="Module Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      </form>
   </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._statetypes.type,
    reduxState: state,
  }
}

const ConnectedStatetypePanel = connect(mapStateToProps)(StatetypePanel)
export default ConnectedStatetypePanel;
