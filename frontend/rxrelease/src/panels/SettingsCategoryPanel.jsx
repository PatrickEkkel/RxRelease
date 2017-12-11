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
      settings: []
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
  componentWillMount() {

      this.props.dispatch(settingsActionCreator.loadAllSettingsByName(this.getCategoryName()))
  }

  render() {
    return <div>
      <h1><b>Category text</b></h1>
      <Table headers = {headers_1} data={SettingsFactory.convertListToMap(this.state.settings)} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
      <Button title="New Setting"/>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
    settings: state._settings.settings
  }
}
const ConnectedSettingsCategoryPanel = connect(mapStateToProps)(SettingsCategoryPanel)

export default ConnectedSettingsCategoryPanel;
