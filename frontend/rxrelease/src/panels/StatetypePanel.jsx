import React from 'react';
import StandardListConverters from '../converters/StandardListConverters'
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import Button from '../components/Button';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Axios from 'axios';
import { connect } from 'react-redux'

class StatetypePanel extends BasicRxPanel {
  constructor() {
    super('STATETYPES','STATETYPE_PANEL');
    this.state = {}
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }

  componentWillMount() {
    var {type} = this.props;
    alert(type)
    this.getLogger().debug("current received state: " + type)
    switch(type) {
      case 'OPEN_NEW_STATETYPE':
        alert('message received')
        break;
    }
  }

  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;

    this.getLogger().debug("current received state: " + type)
    switch(type) {
      case 'OPEN_NEW_STATETYPE':
        alert('message received')
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
