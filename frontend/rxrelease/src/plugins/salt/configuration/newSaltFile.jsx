import React from 'react';
import { connect } from 'react-redux'
import Button from '../../../components/Button';
import LabeledTextField from '../../../components/LabeledTextField';
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import StandardListConverters from '../../../converters/StandardListConverters'
import FileModel from '../../../models/dbmodels/filemodel'
import  * as saltconfigurationActionCreators from '../redux/saltconfigurationactioncreators'


class NewSaltFilePanel extends BasicRxPanel {

  constructor() {
    super('SALT','OPEN_NEW_SALTFILE_PANEL')
    this.state = {
    }

  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }

  componentWillMount() {

    var {type} = this.props;
  }
  componentWillReceiveProps(nextProps) {

  }

  render() {
    return <div className="container">
      <form className="form-horizontal">
      <div className="form-group row">
        <LabeledTextField id="file_name" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="filename" label="filename" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
    </form>
  </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._saltconfiguration.type,
  }
}

const ConnectedNewSaltFilePanel = connect(mapStateToProps)(NewSaltFilePanel)

export default ConnectedNewSaltFilePanel;
