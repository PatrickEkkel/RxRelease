import React from 'react'
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import Button from './components/Button';
import Modal from './components/Modal';
import Menu from './components/Menu';
import ProfilesPanel from './panels/ProfilesPanel';
import ComponentContainer from './components/ComponentContainer';
import ProfilePanel  from './panels/ProfilePanel';
import ProfilesBreadCrumbPanel from './panels/ProfilesBreadCrumbPanel';



class  App  extends React.Component {

  constructor() {
    super();
  }


  render() {
    const headers_1 = ['#','Version 1','Date','Docker image','Version image','Jira ticket'];
    const headers_2 = ['#','Version 2','Date','Docker image','Version image','Jira ticket'];

    var data = [];
    var menuitems = [];
    var components = [];


    data[0] = ['1','test1','test2','test3','test4','test5'];
    data[1] = ['2','test1','test2','test3','test4','test5'];

    menuitems  = ['Profiles','Logging','Reports','Configuration'];
    var componentContainer = "empty"
    var currentComponent =  "empty"
    var profilespanelRef = "empty"
    var modalHandle = "";
    var modalContentHandle = "";
    var component1 = <Table headers={headers_1} data={data} />
    var component2 = <Table headers={headers_2} data={data} />

      var onMenuLoad = function() {
       // Do nothing
      }
      var onModalLoad = function(element) {
        modalHandle.setBody(element)
      }

    var profilesPanel = <ProfilesPanel key="profilespanel" ref={(container) => { profilespanelRef = container }} onModalLoad={onModalLoad} profileRef={(container) => { modalContentHandle = container }} />
    var buttondropdown = <Button key="profilespanel" modal_target="#myModal" data_toggle="modal"/>
    var innerComponent =  profilesPanel;


    var test = function(id) {
      if(id == "Profiles") {

       currentComponent.setInnerComponent(profilesPanel);
           }
      else if (id == "Logging") {

        innerComponent = buttondropdown;
        currentComponent.setInnerComponent(buttondropdown);

      }
    }
    var saveModal = function()  {
      var result =  modalContentHandle.save(function(){
        if(result) {
          modalHandle.closeModal();
          profilespanelRef.reload();
        }
      });

    }

      return  <div className="vertical-left">
      <Modal ref={(container) => {modalHandle = container}} modalId="myModal" closeButtonText="Cancel" title="New Profile"  saveButtonText="Create" body=""  onclick={saveModal} />
        <div className="row">
        <div className="col-md-1 col-xs-offset-2">
         <Menu menuitems={menuitems} onclick={test} onLoad={onMenuLoad} selectedItem="Profiles"/>
        </div>
        </div>
        <div className="row">
        <div className="col-md-1 col-xs-offset-2">
          <ComponentContainer ref={(container) => { currentComponent = container }}>
            {innerComponent}
          </ComponentContainer>
        </div>
        </div>

      </div>

  }

}

export default App;
