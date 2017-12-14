import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import Modal from '../components/Modal';
import SettingsCategoryPanel from './SettingsCategoryPanel'
import SettingPanel from '../panels/SettingPanel';
import * as settingsActionCreator from '../redux/settingsactioncreators'
import SettingsFactory from '../factories/settingsFactory'
import { connect } from 'react-redux'

class SettingsPanel extends React.Component {
  constructor() {
    super()
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
      categories: []
    }
  }
  componentWillReceiveProps(nextProps) {

    if(nextProps.type == 'CATEGORIES_LOADED') {
      this.setState({categories: nextProps.categories})
    }
    if(nextProps.type == 'SAVE_NEW_SETTING') {
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
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  saveAndClose() {
    var factory = new SettingsFactory()
    var kvSetting = factory.newKeyValueSetting(this.state.setting_key,this.state.setting_value,this.state.setting_category);
    this.props.dispatch(settingsActionCreator.saveNewSetting(kvSetting))
  }
  createSetting() {
    //console.log("category_id: " + this.state.category_id)
    this.props.dispatch(settingsActionCreator.newSetting(this.state.categories))
  }
  render() {
    var { type,showModal } = this.props
    var categories = SettingsFactory.convertDictToList(this.state.categories);
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
    showModal: state._settings.showModal
  }
}
const ConnectedSettingsPanel = connect(mapStateToProps)(SettingsPanel)

export default ConnectedSettingsPanel;
