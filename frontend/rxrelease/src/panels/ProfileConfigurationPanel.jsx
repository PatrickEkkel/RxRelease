import React from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Button from '../components/Button';
import ConfigurationPanel from './ConfigurationPanel';
import BasicRxPanel from '../components/panels/BasicRxPanel';

import  * as configurationActionCreators from '../redux/configurationactioncreators'
import * as recipeActionCreators from '../redux/recipeactioncreator'
import { connect } from 'react-redux'


class ProfileConfigurationPanel extends BasicRxPanel {

  constructor() {
    super('CONFIGURATION','PROFILE_CONFIGURATION_PANEL');
    this.state =  {
      selected_profile: null,
      configurations: []};
  }

  onRowClick(entry) {
    this.getLogger().trace('Selected configuration')
    this.getLogger().traceObject(entry)
    // Op dit punt moeten we dus de configuratie laden en de bijhorende capability

    this.props.dispatch(recipeActionCreators.loadRecipePanelFromConfiguration(entry,this.state.selected_profile))
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
    this.props.dispatch(configurationActionCreators.saveNewConfiguration(this.state.configuration_name,selected_profile));
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  componentWillMount() {
    var {type,selected_profile} = this.props;
    if(type == 'LOAD_CONFIGURATION_FROM_PROFILES' || type == 'INITIAL_CONFIGURATION_STATE') {
      this.props.dispatch(configurationActionCreators.loadConfigurations(selected_profile));
      this.setState({selected_profile: selected_profile })
    }
  }
  componentWillReceiveProps(nextProps) {
    var currentContext = this;
    var headers = ['name']
    if(nextProps.type == 'CONFIGURATION_LOADED') {
      this.setState({configurations: nextProps.configurations})
    }

    if(nextProps.type == 'SAVE_NEW_CONFIGURATION') {
        this.props.dispatch(configurationActionCreators.loadConfigurations(currentContext.state.selected_profile));
    }
  }
  render() {
    var currentContext = this;
    var headers = ['id','name']
    var {showModal} = this.props;

    return <div>
      <Modal title="New Configuration" saveAndClose={() => currentContext.saveAndClose(currentContext.state.selected_profile)} close={() => currentContext.close()} showModal={showModal} >
        <ConfigurationPanel changeAttr={(e) => currentContext.changeAttr(e)}/>
      </Modal>
      <Table headers = {headers} data={currentContext.state.configurations} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
      <Button title="New Configuration"  onClick={() => currentContext.createConfiguration(currentContext.state.selected_profile)}/>
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
