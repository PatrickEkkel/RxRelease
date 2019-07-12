import React from 'react';
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import  * as actionCreators from '../redux/actioncreators'
import  * as pluginsactionCreators from '../redux/pluginactioncreators'

class Menu extends BasicRxPanel {
  constructor() {
    super("MENU","MENUPANEL")
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
      mode: "LOGGED_OUT",
      loadedPlugins: []
    }
  }
  getMenuItems() {
    return this.props.menuitems || [];
  }
  onClickEvent(id) {
    this.getLogger().debug("selected ID: " + id)
    this.props.dispatch(actionCreators.changeSelectedMenu(id));
    this.props.onclick(id);
  }
  componentWillMount() {
    var {type} = this.props;

    if(type == 'AUTHENTICATION_ERROR') {
      this.getLogger().debug("not authenticated, hide menu")
      this.getLogger().traceObject(type)
      this.setState({mode: "LOGGED_OUT"});
    }

  }

  getSelectedMenu() {

    if(this.state.selectedMenu != null) {
      return this.state.selectedMenu
    }
    else {
      return "Profiles"
    }
  }

  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var selectedMenu = nextProps.selectedMenu
    var plugins = nextProps.plugins

    this.getLogger().debug("loaded plugins")
    this.getLogger().traceObject(plugins)
    if(type == 'AUTHENTICATION_ERROR') {
      this.setState({mode: "LOGGED_OUT"});
    }
    else if(type == 'AUTHENTICATION_SUCCESS') {
      // TODO: centrale plek maken waar we de landing page kunnen configureren
      this.props.dispatch(pluginsactionCreators.loadEnabledPlugins())
      this.getLogger().debug("authentication success")
      this.setState({mode: "LOGGED_IN",selectedMenu: this.getSelectedMenu()})
    }
    else if(type == 'CHANGE_SELECTED_MENU') {
      this.setState({selectedMenu: selectedMenu })
    }
    else if(type == 'PLUGINS_LOADED') {
      this.getLogger().debug("plugins loaded")
      this.setState({loadedPlugins: plugins,selectedMenu: this.getSelectedMenu(),mode: "LOGGED_IN"})
      //alert('plugins seem to be loaded')
    }
  }
  getPluginMenuItems() {

    this.getLogger().debug("Loaded plugins")

    var plugins = this.state.loadedPlugins
    var result = []
    for(var i=0;i<plugins.length;i++) {
      if(plugins[i].active) {
        result.push(plugins[i].menuoptionname)
      }
    }
    this.getLogger().traceObject(result)
    return result;
  }

  render() {
    this.getLogger().debug("current state")
    this.getLogger().traceObject(this.state)
    var { type,reduxState } = this.props

    var currentContext = this;
    var selectedMenu = this.state.selectedMenu
    var rows = [];

    var link = "";
    var menuitem = "";

    this.getLogger().debug("Selected menu: " + selectedMenu)
    var menuItems = this.getMenuItems()
    var pluginMenuItems = this.getPluginMenuItems()
    menuItems = menuItems.concat(pluginMenuItems)

    this.getLogger().debug("Menu Options")
    this.getLogger().traceObject(menuItems)
    if(this.state.mode != "LOGGED_OUT") {

      menuItems.forEach(function(entry) {
      //entry =>
        link =  <a href="#"  onClick={() => currentContext.onClickEvent(entry)}>{entry}</a>
        if(entry ==  selectedMenu) {
            rows.push(<li className="active" key={entry}>{link}</li>)
          }
        else {
          rows.push(<li key={entry}>{link}</li>)
        }
      });
    }
    else {
      this.getLogger().debug("not authenticated, hide menu")
      this.getLogger().traceObject(this.state.mode)
    }



return <div className="container-fluid">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            {rows}
          </ul>
        </div>
      </div>
  }
}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._menu.type,
    selectedMenu: state._menu.selectedMenu,
    plugins: state._menu.plugins,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedMenu = connect(mapStateToProps)(Menu)

export default ConnectedMenu
