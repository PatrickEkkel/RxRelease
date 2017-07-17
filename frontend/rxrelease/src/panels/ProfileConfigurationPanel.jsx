import React from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Button from '../components/Button';
import ConfigurationPanel from './ConfigurationPanel';
import  * as configurationActionCreators from '../redux/configurationactioncreators'
import { connect } from 'react-redux'


class ProfileConfigurationPanel extends React.Component {

  constructor() {
    super();
    this.state =  {
      selected_profile: null,
      configurations: []};
  }

  onRowClick(entry) {
    alert(entry)
  }
  close() {
      this.props.dispatch(configurationActionCreators.initialConfigurationState())
  }
  createConfiguration(configurations) {
    this.props.dispatch(configurationActionCreators.openNewConfiguration())
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  saveAndClose(selected_profile) {
     console.log("selected_profile: " + selected_profile)
    this.props.dispatch(configurationActionCreators.saveNewConfiguration(this.state.configuration_name,selected_profile));
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    var currentContext = this;
    var headers = ['name']
    var data = []
    var {showModal,selected_profile,type,configurations} = this.props;

    if(type == 'CONFIGURATION_LOADED') {
      this.props.dispatch(configurationActionCreators.configurationComplete())
      this.setState({configurations: configurations})
    }
    if(type == 'SAVE_NEW_CONFIGURATION') {
        this.props.dispatch(configurationActionCreators.configurationLoading())
        this.props.dispatch(configurationActionCreators.loadConfigurations(currentContext.state.selected_profile));
    }
    if(type == 'LOAD_CONFIGURATION_FROM_PROFILES' || type == 'INITIAL_CONFIGURATION_STATE') {
      this.props.dispatch(configurationActionCreators.configurationLoading())
      this.setState({selected_profile: selected_profile })
      this.props.dispatch(configurationActionCreators.loadConfigurations(selected_profile));
    }

    return <div>
      <Modal saveAndClose={() => currentContext.saveAndClose(currentContext.state.selected_profile)} close={() => currentContext.close()} showModal={showModal} >
        <ConfigurationPanel changeAttr={(e) => currentContext.changeAttr(e)}/>
      </Modal>
      <Table headers = {headers} data={currentContext.state.configurations} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
      <Button title="New Configuration"  onClick={() => currentContext.createConfiguration(selected_profile)}/>
      </div>
  }

}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._configuration.type,
    showModal: state._configuration.showModal,
    selected_profile: state._configuration.selected_profile,
    configurations: state._configuration.configurations
  }
}

const ConnectedProfileConfigurationPanel = connect(mapStateToProps)(ProfileConfigurationPanel)

export default ConnectedProfileConfigurationPanel;
