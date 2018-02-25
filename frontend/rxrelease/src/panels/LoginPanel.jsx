import React from 'react';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import LabeledTextField from '../components/LabeledTextField';
import Button from '../components/Button'
import * as profileActionCreators from '../redux/profileactioncreators';
import Axios from 'axios';
import { connect } from 'react-redux'

class  LoginPanel  extends BasicRxPanel {
  constructor() {
    super()
  }
  componentWillMount() {
    var {type} = this.props;
  }
  componentWillReceiveProps(nextProps) {
    var type = nextProps.type
  }
  render() {
    var items = [];
    return <div className="container">
          <form className="form-horizontal">
          <div className="form-group row">
           <LabeledTextField id="username" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Username" label="Username" col="col-md-8" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
          </div>
          <div className="form-group">
           <LabeledTextField id="password" mode="password" errorHandler={(id,callee) => this.handleError(id,callee)}  placeholder="*******" label="Password" col="col-md-8" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
          </div>
          <div className="col">
            <Button title="Login"/>
          </div>
          </form>
       </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._toplevel.type,
  }
}

const ConnectedLoginPanel = connect(mapStateToProps)(LoginPanel)
export default ConnectedLoginPanel;
