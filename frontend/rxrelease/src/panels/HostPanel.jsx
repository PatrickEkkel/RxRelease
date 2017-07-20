import React from 'react';
import LabeledTextField from '../components/LabeledTextField';
import Button from '../components/Button';
import  * as actionCreators from '../redux/actioncreators'
import Axios from 'axios';
import { connect } from 'react-redux'

class  HostPanel  extends React.Component {
  constructor() {
    super()
    this.state = {
      host_hostname: '',
      host_ipaddress: '',
      host_description: ''
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
       <LabeledTextField id="host_hostname" placeholder="Hostname" label="Hostname" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledTextField id="host_ipaddress" placeholder="IP Address" label="IP Address" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledTextField id="host_description" placeholder="Description" label="Description" col="col-md-4" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>

      </form>
   </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._host.type,
    reduxState: state,
  }
}

const ConnectedHostPanel = connect(mapStateToProps)(HostPanel)
export default ConnectedHostPanel;
