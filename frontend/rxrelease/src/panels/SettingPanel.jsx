import React from 'react';
import { connect } from 'react-redux'
import LabeledTextField from '../components/LabeledTextField';
import * as settingsActionCreator from '../redux/settingsactioncreators'

class SettingPanel extends React.Component {

  constructor() {
    super()
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  render() {
    return <div className="container">
      <form className="form-horizontal">
        <div className="form-group row">
          <LabeledTextField id="setting_key" label="Key" col="col-md-2" labelcol="col-md-2" placeholder="Key" onChange={e => this.changeAttr(e)}/>
        </div>
        <div className="form-group row">
          <LabeledTextField id="setting_value" label="Value" col="col-md-2" labelcol="col-md-2" placeholder="Value" onChange={e => this.changeAttr(e)}/>
        </div>
      </form>
      </div>
   }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
    categories: state._settings.categories
  }
}

const ConnectedSettingPanel = connect(mapStateToProps)(SettingPanel)

export default ConnectedSettingPanel;
