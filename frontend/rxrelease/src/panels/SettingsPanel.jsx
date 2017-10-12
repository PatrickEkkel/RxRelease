import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import * as settingsActionCreator from '../redux/settingsactioncreators'

import { connect } from 'react-redux'

class SettingsPanel extends React.Component {
  constructor() {
    super()
    var currentContext = this;
    this.state = {
      selectedItem: "empty"
    }
  }
  componentWillReceiveProps(nextProps) {

  }
  onRowClick() {
    alert('blablabla')
  }
  componentWillMount() {
  }
  render() {
    var headers_1 = ['type','key','value']
    var currentContext = this;
return  <div className="container">
        <Button title="New Category"/>
        <hr></hr>
         <h1><b>Category text</b></h1>
         <Table headers = {headers_1} data={this.state.profiles} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
         <Button title="New Setting"/>

        </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
  }
}
const ConnectedSettingsPanel = connect(mapStateToProps)(SettingsPanel)

export default ConnectedSettingsPanel;
