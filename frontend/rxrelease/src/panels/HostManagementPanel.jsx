import React from 'react';
import  * as hostActionCreators from '../redux/hostactioncreators'
import Button from '../components/Button'
import Utils from '../lib/react/utils'
import LabeledTable from '../components/LabeledTable'
import LabeledTextField from '../components/LabeledTextField'
import StateFactory from '../factories/stateFactory'
import InfoBox from '../components/InfoBox'
import { connect } from 'react-redux'


class  HostManagementPanel  extends React.Component {

  constructor() {
    super()
    this.state = {
      selected_host: null,
      save_success: null,
      errortext_ipaddress: ""
    }

  }
  test(val) {
    console.log(val)
  }
  changeAttr(e) {
    //var methodName = e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1);
    //this.state.selected_host["set" + methodName ](e.target.value)
    var host = this.state.selected_host;
    Utils.bindAttr(host,e.target.id,e.target.value)

    this.setState({selected_host: host})
  }

  onRowClick(entry) {
  }

  componentWillMount() {
    var {type,selected_host} = this.props;
    if(type == 'LOAD_HOST_MANAGEMENT_FROM_HOSTS') {

      this.setState({selected_host: selected_host})

    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.type == "UPDATE_EXISTING_HOST") {
      this.props.dispatch(hostActionCreators.hostupdated(this.state.selected_host))
      this.setState({save_success: true})

    }
    else if(nextProps.type == "UPDATE_EXISTING_HOST_FAILED") {
      console.log("so, we finally recieve the errortext from the server")
      console.log(nextProps.error_fields[0].ipaddress)
      this.setState({
        save_success: false,
        errortext_ipaddress: nextProps.error_fields[0].ipaddress,
        errortext_hostname: nextProps.error_fields[0].hostname
      })
    }
  }
  saveHostDetails() {
    this.props.dispatch(hostActionCreators.updateHost(this.state.selected_host))
  }

  render() {
    var currentContext = this;
    var { type } = this.props

    function handleLabelLoad(entry) {
        if(entry[2] == "NOT INSTALLED") {
          return "label-important label"
        }else {
          return "label-success label"
        }

    }
    var headers = ['#','name'];
    var data = [];
    return <div className="container">
      <InfoBox success={this.state.save_success} success_message="Changes saved successfully" fail_message="Something went wrong while saving"></InfoBox>
      <div className="row">
        <div className="col-md-8">
          <h4><b>Connection details</b></h4>
        </div>
      </div>
      <div className="row">
       &nbsp;
      </div>

      <div  className="row">
        <div className="col-md-8">
        <LabeledTextField col="col-md-4" labelcol="col-md-2" id="hostname" errortext={this.state.errortext_hostname} error={this.state.save_success == null ? false : !this.state.save_success}  label="Hostname:" inputValue={this.state.selected_host.getHostname()} onChange={e => this.changeAttr(e)}/>
        </div>
      </div>
      <div className="row">
        &nbsp;
      </div>
      <div  className="row">
        <div className="col-md-8">
        <LabeledTextField col="col-md-3" labelcol="col-md-2" id="ipAddress" errortext={this.state.errortext_ipaddress} error={this.state.save_success == null ? false : !this.state.save_success} label="IP Address:" inputValue={this.state.selected_host.getIpaddress()} onChange={e => this.changeAttr(e)} />
        </div>
      </div>
      <hr/>
      <div className="row">
       &nbsp;
      </div>
        <div className="row">
          <div className="col-md-8">
            <h4><b>Credentials</b></h4>
          </div>
        </div>
        <div className="row">
         &nbsp;
        </div>

        <div  className="row">
          <div className="col-md-8">
          <LabeledTextField col="col-md-4" labelcol="col-md-2" id="ConnectionCredentials.Username" label="Username:" inputValue={this.state.selected_host.getConnectionCredentials().getUsername()} onChange={e => this.changeAttr(e)}/>
          </div>
        </div>
        <div className="row">
          &nbsp;
        </div>
        <div  className="row">
          <div className="col-md-8">
          <LabeledTextField col="col-md-3" mode="password" labelcol="col-md-2" id="ConnectionCredentials.Password" label="Password:" inputValue={this.state.selected_host.getConnectionCredentials().getPassword()} onChange={e => this.changeAttr(e)} />
          </div>
        </div>
        <div className="row">
         &nbsp;
        </div>
        <Button title="Save All" onClick={() => currentContext.saveHostDetails()} />
        <hr/>
        <div className="row">
          <div className="col-md-8">
            <h3><b>Host States</b></h3>
          </div>
        </div>
        <div className="row">
          &nbsp;
        </div>
      <LabeledTable onLabelLoad={handleLabelLoad} labelText="Status" headers = {headers} data={StateFactory.convertStateListToMap(this.state.selected_host.getStates())} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
      <Button title="Install Host"/>
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

const ConnectedHostManagementPanel = connect(mapStateToProps)(HostManagementPanel)

export default ConnectedHostManagementPanel;
