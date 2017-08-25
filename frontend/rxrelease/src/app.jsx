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
import  * as profileActionCreators from './redux/profileactioncreators'
import  * as hostActionCreators from './redux/hostactioncreators';
import HostsBreadCrumbPanel from './panels/HostsBreadCrumbPanel';
import SettingsPanel from './panels/SettingsPanel';
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
    var store = this.props.store;

      var onMenuLoad = function() {
       // Do nothing
      }
      var onModalLoad = function(element) {
        modalHandle.setBody(element);
      }

    var buttondropdown = <Button key="profilespanel"/>
    var profiles = <ProfilesBreadCrumbPanel onModalLoad={onModalLoad}/>
    var hosts = <HostsBreadCrumbPanel/>
    var settings = <SettingsPanel/>
    var innerComponent =  profiles;

    var navbarClick = function(id) {
      switch(id) {
        case "Settings":
          currentComponent.setInnerComponent(settings);
          innerComponent = settings
        break;
      }
    }
    var menuClick = function(id) {

      switch (id) {
        case "Profiles":
            currentComponent.setInnerComponent(profiles);
            innerComponent = profiles;
            store.dispatch(profileActionCreators.initialProfilesBreadcrumbstate());
            store.dispatch(profileActionCreators.loadProfiles());
          break;
        case "Hosts":
           currentComponent.setInnerComponent(hosts);
           store.dispatch(hostActionCreators.loadHosts());
           innerComponent = hosts;
          break;
        case "Logging":
            currentComponent.setInnerComponent(profiles);
          break;
        default:

      }
    }


      return  <Provider store={this.props.store}><div className="vertical-left">
        <Navbar menuitems={navbaritems} onClick={navbarClick}/>
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
