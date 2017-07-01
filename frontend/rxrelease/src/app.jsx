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
import test from './redux/test'
import { connect } from 'react-redux';



class  App  extends React.Component {

  constructor() {
    super();
  }


  render() {

    var menuitems = [];

    menuitems  = ['Profiles','Logging','Reports','Configuration'];
    var componentContainer = "empty";
    var currentComponent =  "empty";
    var innerComponentRef = "empty";
    var bcPanelRef = "empty";
    var modalHandle = "empty";

      var onMenuLoad = function() {
       // Do nothing
      }
      var onModalLoad = function(element) {
        modalHandle.setBody(element);
        innerComponentRef.setModalHandle(modalHandle);
      }

    var buttondropdown = <Button key="profilespanel"   modal_target="#myModal" data_toggle="modal"/>
    var breadcrumbPanel = <ProfilesBreadCrumbPanel ref={(container) => { bcPanelRef = container }} onModalLoad={onModalLoad}/>
    var innerComponent =  breadcrumbPanel;


    var menuClick = function(id) {

      switch (id) {
        case "Profiles":
            currentComponent.setInnerComponent(breadcrumbPanel);
           innerComponent = profilesPanel;
          break;
        case "Logging":
           currentComponent.setInnerComponent(buttondropdown);
           innerComponent = breadcrumbPanel;
          break;
        case "Reports":
            currentComponent.setInnerComponent(breadcrumbPanel);
            innerComponentRef = bcPanelRef;
          break;
        default:

      }
    }
    var saveModal = function()  {
      bcPanelRef.save();
    }

      return  <div className="vertical-left">
      <Modal ref={(container) => {modalHandle = container}} modalId="myModal" closeButtonText="Cancel" title="New Profile"  saveButtonText="Create" body=""  onclick={saveModal} />
        <div className="row">
        <div className="col-md-1 col-xs-offset-2">
         <Menu menuitems={menuitems} onclick={menuClick} onLoad={onMenuLoad} selectedItem="Profiles"/>
        </div>
        </div>
        <div className="row">
        <div className="col-md-3 col-xs-offset-2">
          <ComponentContainer ref={(container) => { currentComponent = container }}>
            {innerComponent}
          </ComponentContainer>
        </div>
        </div>

      </div>

  }

}

export default App;
