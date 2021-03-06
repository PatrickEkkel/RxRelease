import React from 'react'
import { connect } from 'react-redux'
import DockerComposeConfiguration from '../plugins/docker_compose/DockerComposeConfiguration'
import Button from '../components/Button'
import LabeledTable from '../components/LabeledTable'
import HostFactory from '../factories/hostFactory'
import StandardListConverters from '../converters/StandardListConverters'
import * as recipeActionCreators from '../redux/recipeactioncreator'

class  RecipePanel  extends React.Component {

  constructor() {
    super()
    this.state = {
      hosts: [],
      selectedHostValue: null,
      selected_configuration: null,
      selected_profile: null,
      addedHosts: []
    }
  }

  componentWillMount() {
    var {type,selected_configuration,selected_profile} = this.props;
    if(type == 'LOAD_RECIPE_FROM_CONFIGURATION') {
      this.props.dispatch(recipeActionCreators.loadHostsForRecipe(selected_configuration[0]))
      this.setState({selected_configuration: selected_configuration,selected_profile: selected_profile})

    }

  }

  setHostSelection(e) {
    this.setState({selectedHostValue: e.target.value})
  }
  addHost() {

    if(this.state.selectedHostValue != null) {

      var addedHosts = this.state.addedHosts;
      var availableHosts = this.state.hosts;

      for(var i=0;i<availableHosts.length;i++) {
        if(this.state.hosts[i].getId() == this.state.selectedHostValue) {
          var newAvailableHost = this.state.hosts[i];
          addedHosts.push(newAvailableHost)
          break;
        }
      }
      this.setState({addedHosts: addedHosts});
    }

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.type == 'LOAD_HOSTS_FOR_RECIPE') {

      if(nextProps.addedHost != null) {
        var addedHosts =  this.state.addedHosts
        addedHosts.push(nextProps.addedHost)
        this.setState({hosts: nextProps.hosts,addedHosts: addedHosts})
      }
      else {
        this.setState({hosts: nextProps.hosts})
      }

    }
  }
  saveChanges() {
    console.log("the current selected configuration")
    console.log(this.state.selected_configuration)
    this.props.dispatch(
      recipeActionCreators
      .saveAllRecipeChildren(this.state.addedHosts,this.state.selected_configuration[0],this.state.selected_profile[0],this.state.selected_configuration[1]));
  }
  render() {

    var headers = ['id','hostname','ipaddress','description'];
    var currentContext = this;
    var hostElements = []

    for(var i=0;i<this.state.hosts.length;i++) {
      var id = this.state.hosts[i].getId();
      var hostname = this.state.hosts[i].getHostname();
      hostElements.push(<option key={id} value={id}>{hostname}</option>)
    }


    return <div className="container">

            <div className="clearfix"></div>
      <div className="row">
        <fieldset>
          <div className="col-xs-1">
            <label className="col-xs-1">hosts</label>
          </div>
          <div className="col-xs-2">
            <select className="form-control"  onChange={(e) => currentContext.setHostSelection(e)}>
              <option value="None">None</option>
              {hostElements}
            </select>
          </div>
          <div className="col-xs-1">
          <Button title="Add host" onClick={(e) => currentContext.addHost(e)}/>
          </div>
        </fieldset>
      </div>
      <div className="row">
        <LabeledTable headers={headers} data={StandardListConverters.convertListToMap(this.state.addedHosts,function(item) {
              return [item.getId(),item.getHostname(),item.getIpaddress(),item.getDescription(),item.getStatus()];
          })}/>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">&nbsp;</div>
      <DockerComposeConfiguration/>
      <div className="row col align-self-end">
       &nbsp;&nbsp;&nbsp;&nbsp;
       <Button title="Save changes"  onClick={() => currentContext.saveChanges()}/>
      </div>
      </div>
  }
}

  const mapStateToProps = (state/*, props*/) => {
    return {
      type: state._recipe.type,
      selected_configuration: state._recipe.selected_configuration,
      selected_profile: state._recipe.selected_profile,
      hosts: state._recipe.hosts,
      addedHost: state._recipe.addedHost
    }
  }

const ConnectedRecipePanel = connect(mapStateToProps)(RecipePanel)
export default ConnectedRecipePanel;
