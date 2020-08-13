import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import LoggingPanel from '../panels/LoggingPanel'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import { connect } from 'react-redux'


class  LoggingBreadCrumbPanel  extends BasicRxPanel {

constructor() {
super('LOGGING','LOGGINGBREADCRUMBPANEL')
 this.state = {
   breadcrumbItems: [],
 }
}

componentWillReceiveProps(nextProps) {

  this.getLogger().debug("current panel state: " + nextProps.type)
  var bc_items = [];
  switch(nextProps.type) {
    case 'INITIAL_LOGGING_STATE':
    case 'INITIAL_LOGGING_BREADCRUMB_STATE':
        bc_items = ['Logging']
    break;
    case 'LOAD_LOGGING_DETAILS':
        bc_items = ['Logging','Logging Details']
     break;
  }
  if(bc_items.length > 0) {
         this.breadcrumbHandle.setItems(bc_items)
  }
}
breadCrumbOnClick(clickedItem) {
  switch (clickedItem) {
    case "Logging":
      alert('yes het werkt!')
      //this.props.dispatch(hostsActionCreators.initialHostState());
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
    bc_items = ['Logging']
}
this.setState({breadcrumbItems: bc_items})
}

render() {

var currentContext = this;
var { type } = this.props;
var currentPanel = <LoggingPanel/>

  /*switch (type) {
    case 'LOAD_LOGGING_DETAILS':
      currentPanel = <HostManagementPanel/>
      break;
    //case 'LOGGING_LOADED':
   // currentPanel = <HostsPanel key="profilespanel"/>
    break;
    default:
  }
  */


return <div><BreadCrumb items={this.state.breadcrumbItems} onClick={(clickedItem) => currentContext.breadCrumbOnClick(clickedItem) } ref={(container) => {currentContext.breadcrumbHandle = container}}/>{currentPanel}</div>
}

}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._hostbreadcrumb.type,
  }
}

const ConnectedLoggingBreadCrumbPanel = connect(mapStateToProps)(LoggingBreadCrumbPanel)

export default ConnectedLoggingBreadCrumbPanel;
