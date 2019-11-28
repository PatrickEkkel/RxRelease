import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Modal from '../components/Modal';
import Table from '../components/Table';
import Button from '../components/Button';
import StatetypePanel from './StatetypePanel'
import  * as statetypeActionCreators from '../redux/statetypeactioncreators'


class StatetypesPanel extends BasicRxPanel {

  constructor() {
    super('STATES','STATETYPES_PANEL')
    this.state = {}
  }

  componentWillMount() {

    var {type} = this.props;
    alert(type)


  }

  componentWillReceiveProps(nextProps) {
    var type = nextProps.type;

    switch(type) {

      case 'OPEN_NEW_STATETYPE':
        this.setState({showModal: nextProps.showModal})
      break;
    }
    alert(type)
  }

  saveAndClose() {

  }

  createStateType() {
    this.props.dispatch(statetypeActionCreators.openNewStateType());

  }


  render() {

    var { type,showModal } = this.props
    var currentContext = this;
    const headers = ['#', 'Name', 'Handler', 'Module','Dependent','Type'];
    var hosts = []

    alert(showModal)
    return <div className="container">
        <Modal title="New Statetype" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
            <StatetypePanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers} data={hosts} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        <Button title="New Statetype"  onClick={() => currentContext.createStateType()}/>
   </div>
  }
}

  const mapStateToProps = (state/*, props*/) => {
    return {
      type: state._statetypes.type,
      showModal: state._statetypes.showModal
    }
  }

const ConnectedStatetypesPanel = connect(mapStateToProps)(StatetypesPanel)
export default ConnectedStatetypesPanel;
