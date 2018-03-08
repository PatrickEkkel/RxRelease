import React from 'react';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import LabeledTextField from '../components/LabeledTextField';
import Button from '../components/Button'
import * as loginActionCreators from '../redux/loginactioncreators';
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

  onLogin() {
    this.props.dispatch(loginActionCreators.login(this.state.username,this.state.password))
  }
  render() {
    var items = [];
    return <div className="container">
          <div className="form-group row">
           <LabeledTextField id="username" errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Username" label="Username" col="col-md-8" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
          </div>
          <div className="form-group">
           <LabeledTextField id="password" mode="password" errorHandler={(id,callee) => this.handleError(id,callee)}  placeholder="*******" label="Password" col="col-md-8" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
          </div>
          <div className="col">
            <Button title="Login" onClick={() => this.onLogin() }/>
          </div>
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
