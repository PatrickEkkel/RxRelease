import React from 'react';
import { connect } from 'react-redux'
import * as plugincatalog from '../../plugins/plugincatalog'
import * as pluginsactionCreators from '../../redux/pluginactioncreators'
import * as configurationpluginactionCreators from '../../redux/configuration_pluginpanelactioncreator'
import BasicRxPanel from '../../components/panels/BasicRxPanel';

class ConfigurationPanel  extends BasicRxPanel {


  constructor() {
    super('CONFIGURATION','TABPANEL')
      this.state  = {selectedTab: 'Salt',plugins: []}
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  updateCode() {

  }
  onClickTab(id) {
    this.setState({selectedTab: id})
  }
  renderTab(entry) {
    var className = "nav-item"
    if(entry == this.state.selectedTab) {
      className += " active"
    }

    return <li role="presentation" className={className}  key={entry}>
          <a href="#step1" className="nav-link" data-toggle="tab"  aria-controls="step1" role="tab" title={entry}  onClick={() => this.onClickTab(entry)}>
                  {entry}
              </a>
      </li>
  }


  renderContents(key,value) {
    var className = "tab-pane"
    if(key == this.state.selectedTab) {
      className = " active"
    }
    return <div key={key} className={className}>
      {value}
    </div>
  }
  componentWillMount() {

    var {type} = this.props;

    if(type == 'INITIAL_CONFIGURATION_PLUGINPANEL_STATE') {
      this.props.dispatch(pluginsactionCreators.loadEnabledPlugins())
    }

  }
  componentWillReceiveProps(nextProps) {

      switch (nextProps.type) {
        case 'INITIAL_CONFIGURATION_PLUGINPANEL_STATE':
          this.props.dispatch(pluginsactionCreators.loadEnabledPlugins())
          break;
        case 'PLUGIN_INFO_OBTAINED':
        //  this.setState({plugins: nextProps.obtained_plugins})
          this.props.dispatch(configurationpluginactionCreators.pluginTabsLoaded())
          break;
        default:

      }
      this.getLogger().debug(nextProps.menuType)
      this.getLogger().debug(nextProps.type)
      if(nextProps.menuType == 'PLUGINS_LOADED' && nextProps.type == 'INITIAL_CONFIGURATION_PLUGINPANEL_STATE') {
        this.getLogger().trace("plugin information recieved")
        this.getLogger().traceObject(nextProps.plugins)
        this.setState({plugins: nextProps.plugins})
        this.props.dispatch(configurationpluginactionCreators.pluginInfoObtained(nextProps.plugins))

      }
  }

  render() {
      var tabs = ['RxRelease']
      var tabContent = []

      var plugins = this.state.plugins

      for(var i=0;i<plugins.length;i++) {
        this.getLogger().trace("render tab")
        this.getLogger().traceObject(plugins[i])
       if(plugins[i].active) {
         tabs.push(plugins[i].menuoptionname)
         var module = plugincatalog._modules(plugins[i].menuoptionname)
         tabContent.push(this.renderContents(module.name(),module.getPanel(plugins[i].configurationPanel)))
       }
      }

      this.getLogger().trace("Tabs loaded")
      this.getLogger().traceObject(tabs)


      return <div className="container">
        <section>
         <ul className="nav nav-tabs" role="tablist">
        { tabs.map(entry => this.renderTab(entry)) }
        </ul>
        </section>
        <div className="tab-content container form-group row">
          {tabContent}
        </div>

     </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._configuration_plugin_panel.type,
    menuType: state._menu.type,
    plugins: state._menu.plugins,
    obtained_plugins: state._configuration_plugin_panel.obtained_plugins,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedConfigurationPanel = connect(mapStateToProps)(ConfigurationPanel)

export default ConnectedConfigurationPanel;
