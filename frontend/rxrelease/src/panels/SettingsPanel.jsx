import React from 'react';
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
  componentWillMount() {
  }
  render() {
    var currentContext = this;
return  <div>settingspanel</div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
  }
}
const ConnectedSettingsPanel = connect(mapStateToProps)(SettingsPanel)

export default ConnectedSettingsPanel;
