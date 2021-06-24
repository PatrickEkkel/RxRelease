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
import InfoBox from '../components/InfoBox'
import { connect } from 'react-redux'
import {updateHost, updateHostState} from "../redux/hostactioncreators";


class  HostManagementPanel  extends BasicRxPanel {

  constructor() {
    super('HOSTS','HOSTMANAGEMENTPANEL')
    this.state = {
      selected_host: null,
      system_states: [],
      user_states: [],
    }
  }

  changeAttr(e) {
    var host = this.state.selected_host;
    Utils.bindAttr(host,e.target.id,e.target.value)

    this.setState({  selected_host: host,success: null})
  }

  onRowClick(entry) {
  }

  componentWillMount() {
    var {type,selected_host} = this.props;
    if(type == 'LOAD_HOST_MANAGEMENT_FROM_HOSTS') {
      this.getLogger().traceObject(selected_host)
      var states = selected_host.getStates()
      var system_states = []
      var user_states = []
      for(var i=0;i<states.length;i++) {
        var statetype = states[i].statetype

        if(statetype.system) {
          system_states.push(states[i])
        }
        else {
          user_states.push(states[i])
        }
      }

      this.getLogger().trace("retrieved states")
      this.getLogger().traceObject(states)

      this.setState({selected_host: selected_host, user_states: user_states, system_states: system_states})
    }
  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;

    if(type == "UPDATE_EXISTING_HOST") {
      this.props.dispatch(hostActionCreators.initialHostState())
      this.setState({success: true})
    }
    else if(type == "UPDATE_EXISTING_HOST_FAILED") {
      this.setState({error_fields: error_fields, success: false})
   }
  }
  saveHostDetails() {
    this.props.dispatch(hostActionCreators.updateHost(this.state.selected_host))
  }
  getHost() {
    return this.state.selected_host
  }

  updateHost() {
    this.getLogger().trace("Updating the host")
    this.getLogger().traceObject(this.getHost())
    this.props.dispatch(hostActionCreators.updateHostState(this.getHost()))
  }

  installHost() {
    // TODO: hier een methode inbouwen die de saved_host ophaalt uit een methode (via props of state)
    this.getLogger().trace("installing the host")
    this.getLogger().traceObject(this.getHost())
    this.props.dispatch(hostActionCreators.installHost(this.getHost()))

  }
  render() {
    var currentContext = this;
    var { type } = this.props

    var system_states = StandardListConverters.convertListToMap(this.state.system_states,function(item) {
      return stateComponents.renderStateAsString(item)
    });
    var user_states = StandardListConverters.convertListToMap(this.state.user_states,function(item) {
      return stateComponents.renderStateAsString(item)
    });

    function handleLabelLoad(entry) {
        if(entry[2] == "NOT INSTALLED") {
          return "label-important label"
        }
        else if (entry[2] == "INSTALLED") {
          return "label-success label"
        }
        else if(entry[2] == "REPEATABLE") {
          return "label-info label"
        }
        else if(entry[2] == "COMPLEX") {
          return "label-info label"
        }


    }
    var headers = ['#','name'];
    var data = [];
    return <div className="container">
      <InfoBox success={this.state.success} success_message="Changes saved successfully" fail_message="Something went wrong while saving"></InfoBox>
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
        <LabeledTextField col="col-md-4" labelcol="col-md-2" id="hostname" errorHandler={(id,callee) => this.handleError(id,callee)} label="Hostname:" inputValue={this.state.selected_host.getHostname()} onChange={e => this.changeAttr(e)}/>
        </div>
      </div>
      <div className="row">
        &nbsp;
      </div>
      <div  className="row">
        <div className="col-md-8">
        <LabeledTextField col="col-md-3" labelcol="col-md-2" id="ipAddress" errorHandler={(id,callee) => this.handleError(id,callee)} label="IP Address:" inputValue={this.state.selected_host.getIpaddress()} onChange={e => this.changeAttr(e)} />
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
            <h3><b>System Host States</b></h3>
          </div>
        </div>
        <div className="row">
          &nbsp;
        </div>
      <div className="row">
        <div className="col-md-8">
          <LabeledTable onLabelLoad={handleLabelLoad} labelText="Status" headers = {headers} data={system_states} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <h3><b>User Host States</b></h3>
        </div>
      </div>
      <div className="row">
        &nbsp;
      </div>
      <div className="row">
        <div className="col-md-8">
          <LabeledTable onLabelLoad={handleLabelLoad} labelText="Status" headers = {headers} data={user_states} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        </div>
      </div>
      <div className="btn-toolbar">
        <div className="btn-group mr-2">
            <Button title="Install Host"  onClick={() => this.installHost()}/>
        </div>
        <div className="btn-group mr-2">
            <Button title="Update Configuration" onClick={() => this.updateHost()}/>
        </div>
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

const ConnectedHostManagementPanel = connect(mapStateToProps)(HostManagementPanel)

export default ConnectedHostManagementPanel;
