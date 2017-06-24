import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import ProfilesPanel from './ProfilesPanel';


class  ProfilesBreadCrumbPanel  extends React.Component {

constructor() {
 super();
 this.modalContentHandle = "empty";
 this.profilespanelRef = "empty"
}
setModalHandle(modalHandle) {
  this.modalHandle = modalHandle;
}
save() {
  var currentContext = this;
  var result =  this.modalContentHandle.save(function(){
    if(result) {
      currentContext.modalHandle.closeModal();
      currentContext.profilespanelRef.reload();
    }
  });
}
render() {

var bc_items = ["Profiles","Configuration","Host"];
var profilespanelRef = "empty";


var currentContext = this;

function onModalLoad(element) {
  currentContext.props.onModalLoad(element);
}


var profilesPanel = <ProfilesPanel key="profilespanel" ref={(container) => { currentContext.profilespanelRef = container }} onModalLoad={onModalLoad} profileRef={(container) => { currentContext.modalContentHandle = container }} />

return <div><BreadCrumb items={bc_items}/>{profilesPanel}</div>
}

}

export default ProfilesBreadCrumbPanel;
