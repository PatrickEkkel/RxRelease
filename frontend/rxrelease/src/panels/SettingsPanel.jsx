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
    var categories = SettingsFactory.convertDictToList(this.state.categories);

    var listItems = categories.map(function(category) {

        return (
          <SettingsCategoryPanel key={category.getName()} name={category.getName()} settings={category.getSettings()}/>
        );
      });
    return <div>
      {listItems}
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
