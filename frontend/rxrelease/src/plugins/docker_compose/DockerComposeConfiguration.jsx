import React from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import LabeledDropdown from '../../components/LabeledDropdown'
import * as dcConfigurationActions from './actions/dockercomposeconfigurationactions'


class DockerComposeConfiguration extends React.Component {

  constructor() {
    super()
    this.state = {
      docker_compose_yaml: "",
      selected_configuration: null
    }
  }

  saveChanges() {
      this.props.dispatch(dcConfigurationActions.saveConfiguration(this.state.docker_compose_yaml,this.state.selected_configuration[0]))
  }
  changeAttr(e) {
    this.setState({docker_compose_yaml: e.target.value});
  }
  componentWillMount() {
  var {type,docker_compose_yaml,selected_configuration} = this.props

  if(type ==  'LOAD_RECIPE_FROM_CONFIGURATION') {
   this.props.dispatch(dcConfigurationActions.loadDockercomposeConfiguration(selected_configuration[0]))
   this.setState({selected_configuration: selected_configuration})
  }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.type == 'DC_CONFIGURATION_LOADED') {
      this.setState({docker_compose_yaml: nextProps.docker_compose_yaml})
    }
    if(nextProps.type == 'SAVE_ALL_RECIPE_CHILDREN') {
      this.saveChanges()
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
          </div>

  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._dockercompose_recipe.type,
    docker_compose_yaml: state._dockercompose_recipe.docker_compose_yaml,
    selected_configuration: state._dockercompose_recipe.selected_configuration
  }
}
const ConnectedDockerComposeConfiguration = connect(mapStateToProps)(DockerComposeConfiguration)
export default ConnectedDockerComposeConfiguration;
