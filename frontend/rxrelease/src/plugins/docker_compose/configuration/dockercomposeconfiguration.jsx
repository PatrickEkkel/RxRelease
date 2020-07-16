import React from 'react'
import { connect } from 'react-redux'
import ConfigurationFactory from '../../../factories/configurationFactory'
import Button from '../../../components/Button'
import LabeledDropdown from '../../../components/LabeledDropdown'
import * as dcConfigurationActions from '../actions/dockercomposeconfigurationactions'

class DockerComposeConfigurationPanel extends React.Component {

  constructor() {
    super()
    this.state = {
      docker_compose_yaml: "",
      selected_configuration: null,
      dcConfiguration: null

    }
  }

  saveChanges() {

      this.props.dispatch(dcConfigurationActions.saveConfiguration(this.state.docker_compose_yaml,this.state.dcConfiguration.getId()))
  }
  changeAttr(e) {
    this.setState({docker_compose_yaml: e.target.value});
  }
  componentWillMount() {
  var {type,docker_compose_yaml,selected_configuration} = this.props
  // er komt op dit moment een array binnen met configurationdata, dit transformeren voor nu even naar een object
  var factory = new ConfigurationFactory()
  var configuration = factory.createConfigurationFromArray(selected_configuration)
  if(type ==  'LOAD_RECIPE_FROM_CONFIGURATION') {
   this.props.dispatch(dcConfigurationActions.loadDockercomposeConfiguration(configuration))
   this.setState({selected_configuration: configuration})
  }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.type == 'DC_CONFIGURATION_LOADED') {
      this.setState({dcConfiguration: nextProps.dcConfiguration,docker_compose_yaml: nextProps.dcConfiguration.getYaml()})
    }
    if(nextProps.type == 'SAVE_ALL_RECIPE_CHILDREN') {
      this.saveChanges()
    }
  }
  render() {
    var currentContext = this
    return  <div className="container">
          <div className="row">
            <div className="col-sm-9">
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
    selected_configuration: state._dockercompose_recipe.selected_configuration,
    dcConfiguration: state._dockercompose_recipe.dcConfiguration
  }
}
const ConnectedDockerComposeConfigurationPanel = connect(mapStateToProps)(DockerComposeConfigurationPanel)
export default ConnectedDockerComposeConfigurationPanel;
