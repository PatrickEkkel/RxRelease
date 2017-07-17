import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import ProfilesPanel from './ProfilesPanel';
import ProfileConfigurationPanel from './ProfileConfigurationPanel';
import Modal from '../components/Modal';
import { connect } from 'react-redux'


class  ProfilesBreadCrumbPanel  extends React.Component {

constructor() {
 super();
}

render() {

var bc_items = [];
var currentContext = this;


var { type } = this.props;
var currentPanel = <ProfilesPanel key="profilespanel" ref={(container) => { currentContext.profilespanelRef = container }}/>

switch(type) {
  case 'LOAD_CONFIGURATION_FROM_PROFILES':
  currentPanel = <ProfileConfigurationPanel/>
  bc_items = ['Profiles','Configuration']
  break;
  default:
  bc_items = ['Profiles']
}

return <div><BreadCrumb items={bc_items}/>{currentPanel}</div>
}

}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
  }
}

const ConnectedProfilesBreadCrumbPanel = connect(mapStateToProps)(ProfilesBreadCrumbPanel)

export default ConnectedProfilesBreadCrumbPanel;
