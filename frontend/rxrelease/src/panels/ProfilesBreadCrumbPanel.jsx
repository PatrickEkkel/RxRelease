import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import ProfilesPanel from './ProfilesPanel';
import ProfileConfigurationPluginPanel from './ProfileConfigurationPluginPanel';
import ProfileConfigurationPanel from './ProfileConfigurationPanel';
import Modal from '../components/Modal';
import  * as profileActionCreators from '../redux/profileactioncreators'
import * as configurationActionCreators from '../redux/configurationactioncreators'
import { connect } from 'react-redux'


class  ProfilesBreadCrumbPanel  extends React.Component {

constructor() {
 super();
 this.state = {
   breadcrumbItems: [],
   selected_profile: null
 }
}

componentWillReceiveProps(nextProps) {

  var bc_items = [];

  switch(nextProps.type) {
    case 'INITIAL_CONFIGURATION_STATE':
    case 'LOAD_CONFIGURATION_FROM_PROFILES':
      this.setState({selected_profile: nextProps.selected_profile})
      bc_items = ['Profiles','Configuration']
    break;
    case 'LOAD_RECIPE_FROM_CONFIGURATION':
      bc_items = ['Profiles','Configuration','Recipe'];
    break;
    case 'INITIAL_PROFILE_BREADCRUMBSTATE':
    case 'INITIAL_PROFILES_STATE':
        bc_items = ['Profiles']
     break;

  }
  if(bc_items.length > 0) {
         this.breadcrumbHandle.setItems(bc_items)
  }
}
breadCrumbOnClick(clickedItem) {
  switch (clickedItem) {
    case "Profiles":
    this.props.dispatch(profileActionCreators.initialProfilesBreadcrumbstate());
    break;
    case "Configuration":
    this.props.dispatch(configurationActionCreators.initialConfigurationState(this.state.selected_profile))
    break;
    default:

  }

}
componentWillMount() {
var { type } = this.props;
var bc_items = [];
switch(type) {
  default:
    bc_items = ['Profiles']
}
this.setState({breadcrumbItems: bc_items})
}
render() {

var currentContext = this;

var { type } = this.props;

var currentPanel = null; // <ProfilesPanel key="profilespanel"/>
switch(type) {
  case 'INITIAL_PROFILE_BREADCRUMBSTATE':
    currentPanel = <ProfilesPanel key="profilespanel"/>
    this.props.dispatch(profileActionCreators.loadProfiles());
  break;
  case 'INITIAL_CONFIGURATION_STATE':
  case 'LOAD_CONFIGURATION_FROM_PROFILES':
    currentPanel = <ProfileConfigurationPanel/>
  break;
  case 'LOAD_RECIPE_FROM_CONFIGURATION':
    currentPanel = <ProfileConfigurationPluginPanel/>
}
return <div><BreadCrumb items={this.state.breadcrumbItems} onClick={(clickedItem) => currentContext.breadCrumbOnClick(clickedItem) } ref={(container) => {currentContext.breadcrumbHandle = container}}/>{currentPanel}</div>
}

}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profilebreadcrumb.type,
    selected_profile: state._profilebreadcrumb.selected_profile
  }
}

const ConnectedProfilesBreadCrumbPanel = connect(mapStateToProps)(ProfilesBreadCrumbPanel)

export default ConnectedProfilesBreadCrumbPanel;
