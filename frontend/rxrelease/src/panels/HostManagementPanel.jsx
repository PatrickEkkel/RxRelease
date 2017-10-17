import React from 'react';
import  * as hostActionCreators from '../redux/hostactioncreators'
import Button from '../components/Button'
import Utils from '../lib/react/utils'
import LabeledTable from '../components/LabeledTable'
import LabeledTextField from '../components/LabeledTextField'
import StateFactory from '../factories/stateFactory'
import { connect } from 'react-redux'


class  HostManagementPanel  extends React.Component {

  constructor() {
    super()
    this.state = {
      selected_host: null
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
        <LabeledTextField col="col-md-4" labelcol="col-md-2" id="hostname" label="Hostname:" inputValue={this.state.selected_host.getHostname()} onChange={e => this.changeAttr(e)}/>
        </div>
      </div>
      <div className="row">
        &nbsp;
      </div>
      <div  className="row">
        <div className="col-md-8">
        <LabeledTextField col="col-md-3" labelcol="col-md-2" id="ipAddress" label="IP Address:" inputValue={this.state.selected_host.getIpaddress()} onChange={e => this.changeAttr(e)} />
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
          <LabeledTextField col="col-md-4" labelcol="col-md-2" id="username" label="Username:" inputValue={this.state.selected_host.getHostname()} onChange={e => this.changeAttr(e)}/>
          </div>
        </div>
        <div className="row">
          &nbsp;
        </div>
        <div  className="row">
          <div className="col-md-8">
          <LabeledTextField col="col-md-3" labelcol="col-md-2" id="Password" label="IP Address:" inputValue={this.state.selected_host.getIpaddress()} onChange={e => this.changeAttr(e)} />
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
    selected_host: state._hostmanagement.selected_host
  }
}

const ConnectedHostManagementPanel = connect(mapStateToProps)(HostManagementPanel)

export default ConnectedHostManagementPanel;
