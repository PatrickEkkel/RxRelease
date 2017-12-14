import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import Modal from '../components/Modal';
import SettingPanel from '../panels/SettingPanel';
import * as settingsActionCreator from '../redux/settingsactioncreators'
import SettingsFactory from '../factories/settingsFactory'


import { connect } from 'react-redux'

class SettingsCategoryPanel extends React.Component {
  constructor() {
    super()
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
      setting_key: '',
      setting_value: '',
      category_id: 1
    }
  }
  componentWillReceiveProps(nextProps) {

   var type = nextProps.type;

   if(type == 'SAVE_NEW_SETTING') {

     this.props.dispatch(settingsActionCreator.loadAllSettingsCategories())
   }
  }
  onRowClick() {
    console.log("lekker klikken")
  }
  saveAndClose() {
    var factory = new SettingsFactory()
    var kvSetting = factory.newKeyValueSetting(this.state.setting_key,this.state.setting_value,this.state.category_id);
    this.props.dispatch(settingsActionCreator.saveNewSetting(kvSetting))
  }
  createSetting() {
    this.props.dispatch(settingsActionCreator.newSetting())
  }
  close() {
    this.props.dispatch(settingsActionCreator.initialSettingsState());
  }
  getCategoryName() {
    return this.props.name;
  }
  getSettings() {
    return this.props.settings;
  }
  componentWillMount() {
      this.props.dispatch(settingsActionCreator.loadAllSettingsCategories())
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    var headers = ["#","key","value"]
    var { type,showModal } = this.props

    var settings = SettingsFactory.convertListToMap(this.getSettings());
    var currentContext = this;

    return <div className="container">
      <Modal title="New Setting" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
        <SettingPanel changeAttr={(e) => currentContext.changeAttr(e)}/>
      </Modal>
      <h1><b>{this.getCategoryName()}</b></h1>
      <Table headers = {headers} data={settings} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
      <Button title="New Setting" onClick={() => currentContext.createSetting()}/>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
    showModal: state._settings.showModal
  }
}
const ConnectedSettingsCategoryPanel = connect(mapStateToProps)(SettingsCategoryPanel)

export default ConnectedSettingsCategoryPanel;
