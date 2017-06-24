import React from 'react';
import BreadCrumb from '../components/BreadCrumb'


class  ProfilesBreadCrumbPanel  extends React.Component {

constructor() {
 super();
}
onModalLoad(e) {
  this.props.onModalLoad();
}
render() {
  var currentContext = this;
  var profilespanelRef = "empty"
  var modalContentHandle = "empty"
  // misschien kan dit handger.. ik weet het nog niet
  var onModalLoad = function(element) {
    currentContext.props.onModalLoad(element);
  }
var profilesPanel = <ProfilesPanel key="profilespanel" ref={(container) => { profilespanelRef = container }} onModalLoad={onModalLoad} profileRef={(container) => { modalContentHandle = container }} />


return <div><BreadCrumb/></div>

}

}

export default ProfilesBreadCrumbPanel;
