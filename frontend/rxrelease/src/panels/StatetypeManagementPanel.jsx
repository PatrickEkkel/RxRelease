import React from 'react';
import  * as hostActionCreators from '../redux/hostactioncreators'
import * as stateComponents from '../panels/Hosts/States/Components/StateComponents'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Button from '../components/Button'
import Utils from '../lib/react/utils'
import LabeledTable from '../components/LabeledTable'
import LabeledTextField from '../components/LabeledTextField'
import StateFactory from '../factories/stateFactory'
import StandardListConverters from '../converters/StandardListConverters'
import LabeledDropdown from '../components/LabeledDropdown';

import InfoBox from '../components/InfoBox'
import { connect } from 'react-redux'


class StatetypeManagentPanel  extends BasicRxPanel {

  constructor() {
    super('STATES','STATETYPE_MANAGEMENT_PANEL')
    this.state = {
      jobtypes: [],
      moduletypes: []
    }
  }

  componentWillMount() {
    var {type} = this.props;

  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;

  }
  render() {
    var currentContext = this;
    var { type } = this.props

    return <div className="container">
    <div className="container">
      <div className="row">
       <LabeledTextField id="name" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Name" label="name" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="row">
       <LabeledDropdown id="jobtype" errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.jobtypes)} label="Job Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="row">
       <LabeledDropdown id="module" errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.moduletypes)} label="Module Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <Button title="Save All" onClick={() => currentContext.saveHostDetails()} />

   </div>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._hostmanagement.type,
    selected_host: state._hostmanagement.selected_host,
    error_fields: state._hostmanagement.error_fields
  }
}

const ConnectedStatetypeManagentPanel = connect(mapStateToProps)(StatetypeManagentPanel)

export default ConnectedStatetypeManagentPanel;
