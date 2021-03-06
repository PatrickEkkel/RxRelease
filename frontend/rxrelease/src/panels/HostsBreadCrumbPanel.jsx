import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import HostsPanel from '../panels/HostsPanel'
import HostManagementPanel from '../panels/HostManagementPanel'
import *  as hostsActionCreators from '../redux/hostactioncreators'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import { connect } from 'react-redux'


class  HostsBreadCrumbPanel  extends BasicRxPanel {

constructor() {
super('HOSTS','HOSTSBREADCRUMBPANEL')
 this.state = {
   breadcrumbItems: [],
 }
}

componentWillReceiveProps(nextProps) {

  this.getLogger().debug("current panel state: " + nextProps.type)
  var bc_items = [];
  switch(nextProps.type) {
    case 'INITIAL_HOSTS_STATE':
    case 'INITIAL_HOST_BREADCRUMB_STATE':
        bc_items = ['Hosts']
    break;
    case 'LOAD_HOST_MANAGEMENT_FROM_HOSTS':
        bc_items = ['Hosts','Host Details']
     break;
  }
  if(bc_items.length > 0) {
         this.breadcrumbHandle.setItems(bc_items)
  }
}
breadCrumbOnClick(clickedItem) {
  switch (clickedItem) {
    case "Hosts":
      this.props.dispatch(hostsActionCreators.initialHostState());
    break;
    default:

  }

}
componentWillMount() {

var { type } = this.props;
this.getLogger().debug("current panel state: " + type)

var bc_items = [];
switch(type) {
  default:
    bc_items = ['Hosts']
}
this.setState({breadcrumbItems: bc_items})
}

render() {

var currentContext = this;
var { type } = this.props;
var currentPanel = <HostsPanel key="profilespanel"/>

  switch (type) {
    case 'LOAD_HOST_MANAGEMENT_FROM_HOSTS':
      currentPanel = <HostManagementPanel/>
      break;
    case 'HOSTS_LOADED':
      currentPanel = <HostsPanel key="profilespanel"/>
    break;
    default:

  }


return <div><BreadCrumb items={this.state.breadcrumbItems} onClick={(clickedItem) => currentContext.breadCrumbOnClick(clickedItem) } ref={(container) => {currentContext.breadcrumbHandle = container}}/>{currentPanel}</div>
}

}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._hostbreadcrumb.type,
  }
}

const ConnectedHostsBreadCrumbPanel = connect(mapStateToProps)(HostsBreadCrumbPanel)

export default ConnectedHostsBreadCrumbPanel;
