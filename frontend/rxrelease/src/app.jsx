import React from 'react'
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import Button from './components/Button';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import ProfilesPanel from './panels/ProfilesPanel';
import HostsPanel from './panels/HostsPanel';
import ComponentContainer from './components/ComponentContainer';
import ProfilesBreadCrumbPanel from './panels/ProfilesBreadCrumbPanel';
import { Provider } from 'react-redux'



class  App  extends React.Component {

  constructor() {
    super();
  }


  render() {

    var menuitems = [];
    var navbaritems = [];
    menuitems  = ['Profiles','Hosts','Logging','Configuration'];
    navbaritems = ['Overview','Settings','Help'];

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
      }

    var buttondropdown = <Button key="profilespanel"/>
    var profiles = <ProfilesBreadCrumbPanel ref={(container) => { bcPanelRef = container }} onModalLoad={onModalLoad}/>
    var hosts = <HostsPanel/>
    var innerComponent =  profiles;


    var menuClick = function(id) {

      switch (id) {
        case "Profiles":
            currentComponent.setInnerComponent(profiles);
           innerComponent = profilesPanel;
          break;
        case "Hosts":
           currentComponent.setInnerComponent(hosts);
           innerComponent = hosts;
          break;
        case "Logging":
            currentComponent.setInnerComponent(profiles);
            innerComponentRef = bcPanelRef;
          break;
        default:

      }
    }
    var saveModal = function()  {
      bcPanelRef.save();
    }

      return  <Provider store={this.props.store}><div className="vertical-left">
        <Navbar menuitems={navbaritems} onclick={menuClick}/>
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

      </div></Provider>

  }

}

export default App;
