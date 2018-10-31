import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import BasicRxPanel from './panels/BasicRxPanel';
import ProfilesPanel from '../panels/ProfilesPanel';
import HostsPanel from '../panels/HostsPanel';
import ConfigurationPanel from '../panels/Configuration/ConfigurationPanel'
import HostsBreadCrumbPanel from '../panels/HostsBreadCrumbPanel';
import SettingsPanel from '../panels/SettingsPanel';
import LoginPanel from '../panels/LoginPanel'
import ModulesPanel from '../panels/ModulesPanel'

import ProfilesBreadCrumbPanel from '../panels/ProfilesBreadCrumbPanel';
import  * as profileActionCreators from '../redux/profileactioncreators'
import  * as hostActionCreators from '../redux/hostactioncreators'
import  * as loginActionCreators from '../redux/loginactioncreators'


class  ComponentContainer  extends BasicRxPanel {
  constructor() {
    super("TOPLEVEL","COMPONENTCONTAINER")
    this.state = {
      innerComponent: <ProfilesBreadCrumbPanel/>,
      containerState: "init",
    }
  }
  setInnerComponent(newComponent) {
    this.setState({containerState: "reload",innerComponent: newComponent});
  }
  getInnerComponent() {
    return this.state.innerComponent
  }
  reload() {
    this.setState({innerComponent: 'load'} );
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.getLogger().debug("recieved type: ")
    this.getLogger().traceObject(nextProps)

    switch (nextProps.type) {
      case 'AUTHENTICATION_ERROR':
        this.getLogger().debug("access not granted...   redirecting")
        this.setState({ innerComponent: <LoginPanel/>})
        break;
      case 'AUTHENTICATION_SUCCESS':
         this.props.dispatch(loginActionCreators.goToLandingPage());
        break;
      case 'LOAD_PROFILES_PANEL':
        this.props.dispatch(profileActionCreators.initialProfilesBreadcrumbstate());
        this.props.dispatch(profileActionCreators.loadProfiles());
        this.setState({ innerComponent:  <ProfilesBreadCrumbPanel/>})
        break;
      case 'LOAD_HOSTS_PANEL':
        this.setState({innerComponent: <HostsBreadCrumbPanel/>})
        this.props.dispatch(hostActionCreators.initialHostState());
        break;
      case  'LOAD_SETTINGS_PANEL':
        this.setState({innerComponent: <SettingsPanel/>})
        this.props.dispatch()
        break;
      case 'LOAD_CONFIGURATION_PANEL':
        this.setState({innerComponent: <ConfigurationPanel/> })
        break;
      case 'LOAD_MODULE_PANEL':
        this.setState({innerComponent: <ModulesPanel/> })
        break;
    }
  }
  render() {
    return <div>{this.getInnerComponent()}</div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._toplevel.type,
  }
}

const ConnectedComponentContainer = connect(mapStateToProps)(ComponentContainer)

export default ConnectedComponentContainer;
