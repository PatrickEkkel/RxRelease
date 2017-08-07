import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import HostsPanel from '../panels/HostsPanel'
import HostManagementPanel from '../panels/HostManagementPanel'
import hostsActionCreators from '../redux/hostactioncreators'
import { connect } from 'react-redux'


class  HostsBreadCrumbPanel  extends React.Component {

constructor() {
 super();
 this.state = {
   breadcrumbItems: [],
 }
}

componentWillReceiveProps(nextProps) {

  var bc_items = [];

  switch(nextProps.type) {
    case 'INITIAL_HOST_BREADCRUMB_STATE':
        bc_items = ['Hosts']
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
