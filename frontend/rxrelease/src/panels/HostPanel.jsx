import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import Button from '../components/Button';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import  * as actionCreators from '../redux/actioncreators'
import Axios from 'axios';
import { connect } from 'react-redux'

class  HostPanel  extends BasicRxPanel {
  constructor() {
    super('HOSTS','HOSTPANEL');
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }

  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;


    if(type == 'SAVE_NEW_HOST_FAILED') {
      this.setState({error_fields: error_fields,success: false});
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
    type: state._host.type,
    reduxState: state,
    error_fields: state._host.error_fields
  }
}

const ConnectedHostPanel = connect(mapStateToProps)(HostPanel)
export default ConnectedHostPanel;
