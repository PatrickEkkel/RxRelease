import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import Modal from '../components/Modal';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import SettingsCategoryPanel from './SettingsCategoryPanel'
import SettingPanel from '../panels/SettingPanel';
import * as settingsActionCreator from '../redux/settingsactioncreators'
import SettingsFactory from '../factories/settingsFactory'
import StandardListConverters from '../converters/StandardListConverters';
import { connect } from 'react-redux'

class SettingsPanel extends BasicRxPanel {
  constructor() {
    super("SETTINGS","SETTINGSPANEL")
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
      categories: [],
    }
  }
  componentWillReceiveProps(nextProps) {

    if(nextProps.type == 'CATEGORIES_LOADED') {
      this.setState({categories: nextProps.categories})
    }
    if(nextProps.type == 'SAVE_NEW_SETTING') {
      this.clearState();
      this.props.dispatch(settingsActionCreator.loadAllSettingsCategories())
    }
  }

  componentWillMount() {

    this.props.dispatch(settingsActionCreator.loadAllSettingsCategories())
  }
  onRowClick() {
    alert('blablabla')
  }

  close() {
    this.props.dispatch(settingsActionCreator.initialSettingsState());
  }
  saveAndClose() {
    var factory = new SettingsFactory()
    this.getLogger().debug("current content of the state object: ")
    this.getLogger().traceObject(this.state)
    var kvSetting = factory.newKeyValueSetting(this.state.key,this.state.value,this.state.category);
    this.props.dispatch(settingsActionCreator.saveNewSetting(kvSetting))
  }
  clearState() {
    this.setState({key: null,value: null,category: null})
  }
  createSetting() {
    this.props.dispatch(settingsActionCreator.newSetting(this.state.categories))
  }
  render() {
    var { type,showModal } = this.props
    var categories = StandardListConverters.convertDictToList(this.state.categories);
    var currentContext = this;
    var listItems = categories.map(function(category) {
        return (
          <SettingsCategoryPanel id={category.getId()} key={category.getName()} name={category.getName()} category_id={category.getId()} settings={category.getSettings()}/>
        );
      });

    return <div>
      <Modal title="New Setting" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
        <SettingPanel changeAttr={(e) => currentContext.changeAttr(e)}/>
      </Modal>
      {listItems}
      <Button title="New Setting" onClick={() => currentContext.createSetting()}/>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
    categories: state._settings.categories,
    showModal: state._settings.showModal,
    settings_save_success: state._settings.settings_save_success
  }
}
const ConnectedSettingsPanel = connect(mapStateToProps)(SettingsPanel)

export default ConnectedSettingsPanel;
