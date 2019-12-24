import React from 'react';
import * as stateComponents from '../panels/Hosts/States/Components/StateComponents';
import  * as statetypeActionCreators from '../redux/statetypeactioncreators';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Button from '../components/Button';
import Utils from '../lib/react/utils';
import LabeledTable from '../components/LabeledTable';
import LabeledTextField from '../components/LabeledTextField';
import StateFactory from '../factories/stateFactory';
import StandardListConverters from '../converters/StandardListConverters';
import LabeledDropdown from '../components/LabeledDropdown';
import JobType from '../models/jobtype';
import ModuleType from '../models/moduletype';

import InfoBox from '../components/InfoBox';
import { connect } from 'react-redux';


class StatetypeManagementPanel  extends BasicRxPanel {

  constructor() {
    super('STATES','STATETYPE_MANAGEMENT_PANEL')
    this.state = {
      jobtypes:  JobType.JobTypes(),
      moduletypes: ModuleType.ModuleTypes(),
      selected_statetype: null
    }
  }
  changeAttr(e) {
    var statetype = this.state.selected_statetype;
    Utils.bindAttr(statetype,e.target.id,e.target.value)
    this.setState({  selected_statetype: statetype,success: null})
    this.getLogger().trace('changing statetype');
    this.getLogger().traceObject(statetype)
  }
  componentWillMount() {
    var {type, statetype, jobtypes, moduletypes} = this.props;
    switch (type) {
      case 'LOAD_STATETYPE_MANAGEMENT_FROM_STATETYPES':
        this.getLogger().trace('received statetype')
        this.getLogger().traceObject(statetype)
        this.setState({selected_statetype: statetype})
        // load moduletypes
      break;
      }
  }


  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;
    switch (type) {
      case 'UPDATE_EXISTING_STATETYPE':
        // return to overview
        this.props.dispatch(statetypeActionCreators.initialStatetypeState());
        break;
      default:

    }
  }

  saveStatetypeDetails() {
    this.props.dispatch(statetypeActionCreators.updateStatetype(this.state.selected_statetype));
  }


  render() {
    var currentContext = this;
    var { type } = this.props
    return <div className="container">
    <div className="container">
      <div className="row">
       <LabeledTextField id="name" inputValue={this.state.selected_statetype.getName()} errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Name" label="name" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="row">
       <LabeledDropdown id="jobtype" selectedValue={this.state.selected_statetype.getJobtype()} errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.jobtypes)} label="Job Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="row">
       <LabeledDropdown id="module" selectedValue={this.state.selected_statetype.getModule()} errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.moduletypes)} label="Module Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <Button title="Save All" onClick={() => this.saveStatetypeDetails()} />

   </div>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._statetypes.type,
    statetype: state._statetypes.statetype,
    error_fields: state._statetypes.error_fields
  }
}

const ConnectedStatetypeManagementPanel = connect(mapStateToProps)(StatetypeManagementPanel)

export default ConnectedStatetypeManagementPanel;
