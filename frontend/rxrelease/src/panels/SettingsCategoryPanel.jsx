import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import * as settingsActionCreator from '../redux/settingsactioncreators'
import SettingsFactory from '../factories/settingsFactory'


import { connect } from 'react-redux'

class SettingsCategoryPanel extends React.Component {
  constructor() {
    super()
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
    }
  }
  componentWillReceiveProps(nextProps) {

  }
  onRowClick() {
    alert('blablabla')
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

  render() {
    var headers = ["#","key","value"]
    var settings = SettingsFactory.convertListToMap(this.getSettings());
    console.log("de settings alstublieft")
    console.log(settings)
    return <div>
      <h1><b>{this.getCategoryName()}</b></h1>
      <Table headers = {headers} data={settings} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
      <Button title="New Setting"/>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
  }
}
const ConnectedSettingsCategoryPanel = connect(mapStateToProps)(SettingsCategoryPanel)

export default ConnectedSettingsCategoryPanel;
