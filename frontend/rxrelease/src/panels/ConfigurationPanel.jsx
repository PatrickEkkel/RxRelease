import React from 'react';
import  * as actionCreators from '../redux/actioncreators'
import LabeledTextField from '../components/LabeledTextField';
import { connect } from 'react-redux'


class ConfigurationPanel  extends React.Component {


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
           <LabeledTextField id="configuration_name" placeholder="Configuration name" label="Name" col="col-md-2" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
          </div>
          </form>
       </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._configuration.type,
  }
}

const ConnectedConfigurationPanel = connect(mapStateToProps)(ConfigurationPanel)

export default ConnectedConfigurationPanel;
