import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import BasicRxPanel from './panels/BasicRxPanel';
import ProfilesPanel from '../panels/ProfilesPanel';
import HostsPanel from '../panels/HostsPanel';
import HostsBreadCrumbPanel from '../panels/HostsBreadCrumbPanel';

import ProfilesBreadCrumbPanel from '../panels/ProfilesBreadCrumbPanel';
import  * as profileActionCreators from '../redux/profileactioncreators'
import  * as hostActionCreators from '../redux/hostactioncreators'


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
        this.setState({ innerComponent: "no access"})
        break;
      case 'LOAD_PROFILES_PANEL':
        this.props.dispatch(profileActionCreators.initialProfilesBreadcrumbstate());
        this.props.dispatch(profileActionCreators.loadProfiles());
        this.setState({ innerComponent:  <ProfilesBreadCrumbPanel/>})
        break;
      case 'LOAD_HOSTS_PANEL':
        this.setState({innerComponent: <HostsBreadCrumbPanel/>})
        this.props.dispatch(hostActionCreators.loadHosts());
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
