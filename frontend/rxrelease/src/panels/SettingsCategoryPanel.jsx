import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import * as settingsActionCreator from '../redux/settingsactioncreators'
import SettingsFactory from '../factories/settingsFactory'
import StandardListConverters from '../converters/StandardListConverters'


import { connect } from 'react-redux'

class SettingsCategoryPanel extends React.Component {
  constructor() {
    super()
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
    }
  }

  onRowClick() {
    console.log("lekker klikken")
  }

  getCategoryName() {
    return this.props.name;
  }
  getSettings() {
    return this.props.settings;
  }


  render() {
    var headers = ["#","key","value"]
    var settings = StandardListConverters.convertListToMap(this.getSettings(),function(item) {
       return [item.getId(),item.getKey(),item.getValue()];
    });
    var currentContext = this;
    return <div className="container">

      <h1><b>{this.getCategoryName()}</b></h1>
      <Table headers = {headers} data={settings} onRowClick={(entry) => currentContext.onRowClick(entry)}/>

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
const ConnectedSettingsCategoryPanel = connect(mapStateToProps)(SettingsCategoryPanel)

export default ConnectedSettingsCategoryPanel;
