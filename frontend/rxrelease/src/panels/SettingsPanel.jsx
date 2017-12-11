import React from 'react';
import Table from '../components/Table'
import Button from '../components/Button'
import SettingsCategoryPanel from './SettingsCategoryPanel'
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

    if(nextProps.type == 'LOAD_CATEGORIES') {
      this.setState({categories: nextProps.categories})
    }

  }
  onRowClick() {
    alert('blablabla')
  }
  componentWillMount() {

    this.props.dispatch(settingsActionCreator.loadAllSettingsCategories())
  }
  render() {

    //var factory = new SettingsFactory()

    var headers_1 = ['type','key','value']
    var currentContext = this;
return  <div className="container">
        <Button title="New Category"/>
        <hr></hr>
         <h1><b>Category text</b></h1>
         <Table headers = {headers_1} data={SettingsFactory.convertListToMap(this.state.categories)} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
         <Button title="New Setting"/>
        </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
    categories: state._settings.categories
  }
}
const ConnectedSettingsPanel = connect(mapStateToProps)(SettingsPanel)

export default ConnectedSettingsPanel;
