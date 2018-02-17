import React from 'react';
import Button from '../components/Button';
import LabeledTable from '../components/LabeledTable';
import HostFactory from '../factories/hostFactory'
import StandardListConverters from '../converters/StandardListConverters'

import BasicRxPanel from '../components/panels/BasicRxPanel';
import HostPanel from './HostPanel'
import  * as hostActionCreators from '../redux/hostactioncreators'
import Modal from '../components/Modal';
import { connect } from 'react-redux'


class  HostsPanel  extends BasicRxPanel {

  constructor() {
    super('HOSTS','HOSTSPANEL')
    this.state = {
      hosts: [],
      test: false,
      save_success: null
    }
  }
  createHost() {
    this.props.dispatch(hostActionCreators.openNewHost());
  }
  saveAndClose() {
    this.props.dispatch(hostActionCreators.saveNewHost(this.state.hostname,this.state.ipaddress,this.state.description,this.state.profiletype));
  }
  close() {

    this.props.dispatch(hostActionCreators.initialHostState());
  }
  onRowClick(entry) {
    this.props.dispatch(hostActionCreators.loadHostManagement(entry));
  }

  clearState() {
    this.setState({hostname: null,ipaddress: null,description: null})
  }
  componentWillMount() {

    var {type} = this.props;
    if(type == 'INITIAL_HOSTS_STATE') {
      this.props.dispatch(hostActionCreators.loadHosts())
      this.setState({test: true})
    }
  }


  componentWillReceiveProps(nextProps) {


    if(nextProps.type == 'HOSTS_LOADED') {
      this.setState({hosts: nextProps.hosts})
    }
    else if(nextProps.type == 'SAVE_NEW_HOST') {
          this.props.dispatch(hostActionCreators.initialHostState());
          this.clearState();
    }
    else if(nextProps.type == 'INITIAL_HOSTS_STATE') {
          this.props.dispatch(hostActionCreators.loadHosts())
    }
  }

  render() {
    var { type,showModal } = this.props
    var currentContext = this;
    const headers = ['#','Hostname','IP Address','Description'];

    var hosts = StandardListConverters.convertListToMap(this.state.hosts,function(item) {
      return [item.getId(),item.getHostname(),item.getIpaddress(),item.getDescription(),item.getStatus()]
    });

    return <div className="container">
        <Modal title="New Host" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
          <HostPanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <LabeledTable labelText="Minion Status" headers = {headers} data={hosts} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        <Button title="New Host"  onClick={() => currentContext.createHost()}/>
   </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._host.type,
    showModal: state._host.showModal,
    hosts: state._host.hosts
  }
}

const ConnectedHostsPanel = connect(mapStateToProps)(HostsPanel)

export default ConnectedHostsPanel;
