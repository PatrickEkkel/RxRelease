import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import ProfilesPanel from './ProfilesPanel';
import ProfileConfigurationPanel from './ProfileConfigurationPanel';
import Modal from '../components/Modal';
import  * as profileActionCreators from '../redux/profileactioncreators'
import { connect } from 'react-redux'


class  ProfilesBreadCrumbPanel  extends React.Component {

constructor() {
 super();
 this.state = {
   breadcrumbItems: []
 }
}

componentWillReceiveProps(nextProps) {

  var { type } = this.props;
  console.log("hier komt ie dus wel elke keer langs")
  console.log(nextProps.type)
  var bc_items = [];
  switch(nextProps.type) {
    case 'LOAD_CONFIGURATION_FROM_PROFILES':
      bc_items = ['Profiles','Configuration']
     this.breadcrumbHandle.setItems(bc_items)
    break;
    case 'INITIAL_PROFILES_STATE':
        bc_items = ['Profiles']
     this.breadcrumbHandle.setItems(bc_items)
    break;
  }

}
breadCrumbOnClick(clickedItem) {

  switch (clickedItem) {
    case "Profiles":
    this.props.dispatch(profileActionCreators.initialProfilesState());
    break;
    default:

  }

}
componentWillMount() {
console.log("hier komt ie dus maar 1 keer langs")
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
var currentPanel = <ProfilesPanel key="profilespanel"/>

switch(type) {
  case 'LOAD_CONFIGURATION_FROM_PROFILES':
    currentPanel = <ProfileConfigurationPanel/>
  break;
}
return <div><BreadCrumb items={this.state.breadcrumbItems} onClick={(clickedItem) => currentContext.breadCrumbOnClick(clickedItem) } ref={(container) => {currentContext.breadcrumbHandle = container}}/>{currentPanel}</div>
}

}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
  }
}

const ConnectedProfilesBreadCrumbPanel = connect(mapStateToProps)(ProfilesBreadCrumbPanel)

export default ConnectedProfilesBreadCrumbPanel;
