import React from 'react';
import * as stateComponents from '../panels/Hosts/States/Components/StateComponents';
import  * as statetypeActionCreators from '../redux/statetypeactioncreators';
import * as plugincatalog from '../plugins/plugincatalog'
import * as pluginsactionCreators from '../redux/pluginactioncreators'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import Button from '../components/Button';
import Utils from '../lib/react/utils';
import LabeledTable from '../components/LabeledTable';
import LabeledTextField from '../components/LabeledTextField';
import StateFactory from '../factories/stateFactory';
import StandardListConverters from '../converters/StandardListConverters';
import LabeledDropdown from '../components/LabeledDropdown';
import JobType from '../models/jobtype';
import ModuleType from '../models/moduletype';

import InfoBox from '../components/InfoBox';
import { connect } from 'react-redux';


class StatetypeManagementPanel  extends BasicRxPanel {

  constructor() {
    super('STATES','STATETYPE_MANAGEMENT_PANEL')
    this.state = {
      jobtypes:  JobType.JobTypes(),
      moduletypes: ModuleType.ModuleTypes(),
      selected_statetype: null,
      plugins: [],
      reloaded_plugins: {}
    }
  }
  changeAttr(e) {
    var statetype = this.state.selected_statetype;
    Utils.bindAttr(statetype,e.target.id,e.target.value)
    this.setState({  selected_statetype: statetype,success: null})
    this.getLogger().trace('changing statetype');
    this.getLogger().traceObject(statetype)
  }
  componentWillMount() {
    var {type, statetype, jobtypes, moduletypes} = this.props;
    switch (type) {
      case 'LOAD_STATETYPE_MANAGEMENT_FROM_STATETYPES':
        this.getLogger().trace('received statetype')
        this.getLogger().traceObject(statetype)
        this.setState({selected_statetype: statetype})
        this.props.dispatch(pluginsactionCreators.loadEnabledPlugins())
        // load moduletypes
      break;
      }
  }
  reloadScreen(updated_plugin) {
    var reloaded_plugins = this.state.reloaded_plugins
    var reload = true;
    for(var i=0;i<this.state.plugins.length;i++) {
      if(this.state.plugins[i].name == updated_plugin) {
        reloaded_plugins[updated_plugin] = true
      }

      this.getLogger().traceObject(this.state.plugins[i])
    }

    if(reloaded_plugins.length == this.state.plugins.length) {
      for(var i=0;i<reloaded_plugins.length;i++) {
        if(!reloaded_plugins[i]) {
          reload = false;
        }
      }
    }

    this.setState({ reloaded_plugins: reloaded_plugins})

    if(reload) {
      this.props.dispatch(statetypeActionCreators.initialStatetypeState());
    }
  }
  loadStateTypePluginsPanel(plugins) {
    this.getLogger().trace('selected statetype');
    this.getLogger().traceObject(this.state.selected_statetype);
    var selected_statetype = this.state.selected_statetype
    for(var i=0;i<plugins.length;i++) {

      if (selected_statetype.module == plugins[i].name) {
        var module = plugincatalog._modules(plugins[i].menuoptionname)

        this.getLogger().trace("statetype matched with available modules");
        this.getLogger().trace("Loading correct panel");
        this.getLogger().traceObject(module)
        var selected_panel = module.getStatetypePanel()
        this.setState({selected_panel: selected_panel})
      }
    }


  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var error_fields = nextProps.error_fields;
    var plugins = nextProps.plugins
    var statetype = nextProps.statetype
    switch (type) {
      case 'UPDATE_EXISTING_STATETYPE':
        // return to overview
        this.getLogger().trace("Update complete, dispatching update to plugins")
        this.props.dispatch(statetypeActionCreators.updatePlugins(this.state.selected_statetype))
        //
        break;
      case 'PLUGINS_LOADED':
        this.getLogger().trace('plugins loaded');
        this.getLogger().traceObject(plugins);
        this.loadStateTypePluginsPanel(plugins);
        this.setState({plugins: plugins});
        break;
      case 'UPDATE_STATETYPE_DONE':
        this.getLogger().trace('Received update complete');
        this.getLogger().traceObject(statetype);
        this.reloadScreen();

        break;
      default:

    }
  }

  saveStatetypeDetails() {

    this.props.dispatch(statetypeActionCreators.updateStatetype(this.state.selected_statetype));
  }


  render() {
    var currentContext = this;
    var { type } = this.props
    var modules = this.state.selected_panel

    return <div className="container">
    <div className="container">
      <div className="row">
       <LabeledTextField id="name" inputValue={this.state.selected_statetype.getName()} errorHandler={(id,callee) => this.handleError(id,callee)} placeholder="Name" label="name" col="col-md-2" labelcol="col-md-2" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="row">
       <LabeledDropdown id="jobtype" selectedValue={this.state.selected_statetype.getJobtype()} errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.jobtypes)} label="Job Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      <div className="row">
       <LabeledDropdown id="module" selectedValue={this.state.selected_statetype.getModule()} errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.moduletypes)} label="Module Type" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
      </div>
      {modules}
      <Button title="Save All" onClick={() => this.saveStatetypeDetails()} />

   </div>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._statetypes.type,
    statetype: state._statetypes.statetype,
    updated_plugin: state._statetypes.updated_plugin,
    plugins: state._statetypes.plugins,
    error_fields: state._statetypes.error_fields
  }
}

const ConnectedStatetypeManagementPanel = connect(mapStateToProps)(StatetypeManagementPanel)

export default ConnectedStatetypeManagementPanel;
