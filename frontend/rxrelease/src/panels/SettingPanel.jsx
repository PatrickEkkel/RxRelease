import React from 'react';
import { connect } from 'react-redux'
import LabeledTextField from '../components/LabeledTextField';
import LabeledDropdown from '../components/LabeledDropdown';
import SettingsFactory from '../factories/settingsFactory';
import StandardListConverters from '../converters/StandardListConverters';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import * as settingsActionCreator from '../redux/settingsactioncreators';


class SettingPanel extends BasicRxPanel {
  constructor() {
    super('SETTINGS','SETTINGPANEL');
    this.setState({
      error_fields: null
    })
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }

  componentWillMount() {
    var  {type,categories} = this.props
    categories = StandardListConverters.convertDictToList(categories)
    categories = StandardListConverters.convertObjectListToDDS(categories);
    this.setState({categories: categories})
  }

  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;


    if(type == 'SAVE_NEW_SETTING_FAILED') {
      this.setState({error_fields: error_fields,success: false});
      //this.handleErrors(error_fields);
    }
  }


  render() {
    var currentContext = this;
    this.getLogger().debug("error_fields recieved from backend")
    this.getLogger().traceObject(this.state.error_fields)
    return <div className="container">
      <form className="form-horizontal">
        <div className="form-group row">
          <LabeledTextField id="key" label="Key" col="col-md-2" labelcol="col-md-2" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Key" onChange={e => this.changeAttr(e)}/>
        </div>
        <div className="form-group row">
          <LabeledTextField id="value" label="Value" col="col-md-2" labelcol="col-md-2" errorHandler={(id,callee) => this.handleError(id,callee)}  placeholder="Value" onChange={e => this.changeAttr(e)}/>
        </div>
        <div className="form-group row">
          <LabeledDropdown id="category" items={this.state.categories} label="Category" col="col-md-2" errorHandler={(id,callee) => this.handleError(id,callee)} labelcol="col-md-2" placeholder="Value" onChange={e => this.changeAttr(e)}/>
        </div>
      </form>
      </div>
   }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
    error_fields: state._settings.error_fields,
    categories: state._settings.categories
  }
}

const ConnectedSettingPanel = connect(mapStateToProps)(SettingPanel)

export default ConnectedSettingPanel;
