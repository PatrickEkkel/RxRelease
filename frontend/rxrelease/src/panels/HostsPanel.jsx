import React from 'react';
import Button from '../components/Button';
import Table from '../components/Table';
import HostPanel from './HostPanel'
import  * as hostActionCreators from '../redux/hostactioncreators'
import Modal from '../components/Modal';
import { connect } from 'react-redux'


class  HostsPanel  extends React.Component {

  constructor() {
    super()
    this.state = {
      hosts: []
    }
  }
  createHost() {
    this.props.dispatch(hostActionCreators.openNewHost());
  }
  saveAndClose() {
    this.props.dispatch(hostActionCreators.saveNewHost(this.state.host_hostname,this.state.host_ipaddress,this.state.host_description));

  }

  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  close() {

    this.props.dispatch(hostActionCreators.initialHostState());
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  onRowClick(entry) {
  }

  componentWillMount() {

    var {type} = this.props;

    if(type == 'INITIAL_HOSTS_STATE') {
      this.props.dispatch(hostActionCreators.loadHosts())
    }
  }
  componentWillReceiveProps(nextProps) {

    if(nextProps.type == 'HOSTS_LOADED') {

      this.setState({hosts: nextProps.hosts})
      console.log("komt ie hier wel??")

    }

  }

  render() {
    var { type,showModal } = this.props
    var currentContext = this;
    const headers = ['#','Hostname','IP Address','Description'];

    return <div className="container">
        <Modal title="New Host" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
          <HostPanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers} data={currentContext.state.hosts} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
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
