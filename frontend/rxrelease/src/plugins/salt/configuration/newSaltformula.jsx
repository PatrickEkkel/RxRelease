import React from 'react';
import { connect } from 'react-redux'
import YAMLEditor from '../../../components/YamlEditor'
import Button from '../../../components/Button';
import LabeledTextField from '../../../components/LabeledTextField';
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import StandardListConverters from '../../../converters/StandardListConverters'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'
import  * as saltconfigurationActionCreators from '../redux/saltconfigurationactioncreators'


class NewFormulaPanel extends BasicRxPanel {

  constructor() {
    super('SALT','NEW_FORMULA_PANEL')
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
        <LabeledTextField id="formula_name" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="name" label="name" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
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

const ConnectedNewFormulaPanel = connect(mapStateToProps)(NewFormulaPanel)

export default ConnectedNewFormulaPanel;
