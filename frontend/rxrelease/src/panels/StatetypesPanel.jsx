import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import StandardListConverters from '../converters/StandardListConverters'
import Modal from '../components/Modal';
import Table from '../components/Table';
import Button from '../components/Button';
import StatetypePanel from './StatetypePanel'


import  * as statetypeActionCreators from '../redux/statetypeactioncreators'


class StatetypesPanel extends BasicRxPanel {

  constructor() {
    super('STATES','STATETYPES_PANEL')
    this.state = {
      statetypes: []
    }
  }

  componentWillMount() {

    var {type} = this.props;

    switch (type) {
      case 'PLUGINS_LOADED':
      case 'INITIAL_STATETYPE_STATE':
        this.props.dispatch(statetypeActionCreators.loadStatetypes())
      break;
      default:

    }

  }

  componentWillReceiveProps(nextProps) {
    var type = nextProps.type;

    switch(type) {
      case 'OPEN_NEW_STATETYPE':
        this.setState({showModal: nextProps.showModal})
      break;
      case 'INITIAL_STATETYPE_STATE':
        this.props.dispatch(statetypeActionCreators.loadStatetypes())
      break;
      case 'SAVE_NEW_STATETYPE':
      this.props.dispatch(statetypeActionCreators.initialStatetypeState())
      break;
      case 'STATETYPES_LOADED':
      this.getLogger().trace('statetypes Loaded')
      this.getLogger().trace('retrieved statetypes')
      this.getLogger().traceObject(nextProps.statetypes)
      this.setState({statetypes: nextProps.statetypes})
      break;
      case 'SAVE_NEW_STATETYPE_FAILED':
        alert('error!')
      break;
    }
  }

  saveAndClose() {
    this.props.dispatch(statetypeActionCreators.saveNewStateType(this.state.name,this.state.jobtype))
  }

  createStateType() {
    this.props.dispatch(statetypeActionCreators.openNewStateType());

  }

  onRowClick(entry) {
    this.getLogger().trace('Clicked on statetype')
    this.getLogger().traceObject(entry)
    this.getLogger().traceObject(entry)
    this.props.dispatch(statetypeActionCreators.loadStatetypeManagement(entry));
  }

  render() {

    var { type,showModal } = this.props
    var currentContext = this;
    const headers = ['#', 'Name', 'Handler', 'Module','Dependent','Type'];

    this.getLogger().trace('retrieved statetypes')
    this.getLogger().traceObject(this.state.statetypes)

    var statetypes = StandardListConverters.convertListToMap(this.state.statetypes,function(item) {
      return [item.getId(),item.getName(),item.getHandler(),item.getModule(),item.getDependence(),item.getJobtype() ]
    });




    return <div className="container">
        <Modal title="New Statetype" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
            <StatetypePanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers} data={statetypes} onRowClick={(entry) => currentContext.onRowClick(entry)} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        <Button title="New Statetype"  onClick={() => currentContext.createStateType()}/>
   </div>
  }
}

  const mapStateToProps = (state/*, props*/) => {
    return {
      type: state._statetypes.type,
      showModal: state._statetypes.showModal,
      statetypes: state._statetypes.statetypes
    }
  }

const ConnectedStatetypesPanel = connect(mapStateToProps)(StatetypesPanel)
export default ConnectedStatetypesPanel;
