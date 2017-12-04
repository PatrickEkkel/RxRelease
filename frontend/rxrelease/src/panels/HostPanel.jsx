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
      host_description: '',
      save_success: null
    }
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.type == 'SAVE_NEW_HOST_FAILED') {

      this.setState({
        errortext_ipaddress: nextProps.error_fields[0].ipaddress,
        errortext_hostname: nextProps.error_fields[0].hostname,
        errortext_description: nextProps.error_fields[0].description,
        save_success: false
      })
    }
  }

  render() {
    var items = ['default'];

    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
       <LabeledTextField id="host_hostname" errortext={this.state.errortext_hostname} error={this.state.save_success == null ? null : !this.state.save_success} placeholder="Hostname" label="Hostname" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledTextField id="host_ipaddress" errortext={this.state.errortext_ipaddress} error={this.state.save_success == null ? null : !this.state.save_success}  placeholder="IP Address" label="IP Address" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="form-group">
       <LabeledTextField id="host_description" errortext={this.state.errortext_description} error={this.state.save_success == null ? null : !this.state.save_success} placeholder="Description" label="Description" col="col-md-4" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
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
