import React from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import * as dcConfigurationActions from './actions/dockercomposeconfigurationactions'

class DockerComposeConfiguration extends React.Component {

  constructor() {
    super()
    this.state = {
      docker_compose_yaml: ""
    }
  }


  saveChanges() {
      this.props.dispatch(dcConfigurationActions.saveConfiguration(this.state.docker_compose_yaml,2))
  }
  changeAttr(e) {
    console.log("hier gebeurt iets" + e.target.value)
    this.setState({docker_compose_yaml: e.target.value});
  }
  componentWillMount() {
  var {type,docker_compose_yaml} = this.props

  if(type ==  'INITIAL_DC_RECIPE_STATE') {
   this.props.dispatch(dcConfigurationActions.loadDockercomposeConfiguration(2))
  }


  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.type == 'DC_CONFIGURATION_LOADED') {
      this.setState({docker_compose_yaml: nextProps.docker_compose_yaml})
    }

  }
  render() {
    var currentContext = this
    return  <div className="container">
          <div className="row">
            <div class="col-sm-9">
              <textarea tabIndex="-1" className="form-control" rows="15" value={this.state.docker_compose_yaml} onChange={(e) => currentContext.changeAttr(e)}/>
          </div>
          </div>
          <div className="row">
            <Button title="RAW"/>
            <Button title="Managed"/>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">&nbsp;</div>
          <div className="row col align-self-end">
            <Button title="Save changes" onClick={() => currentContext.saveChanges()}/>
          </div>
          </div>

  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._dockercompose_recipe.type,
    docker_compose_yaml: state._dockercompose_recipe.docker_compose_yaml
  }
}
const ConnectedDockerComposeConfiguration = connect(mapStateToProps)(DockerComposeConfiguration)
export default ConnectedDockerComposeConfiguration;
