import React from 'react'
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import Button from './components/Button';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import BasicRxPanel from './components/panels/BasicRxPanel';
import ProfilesPanel from './panels/ProfilesPanel';
import HostsPanel from './panels/HostsPanel';
import ComponentContainer from './components/ComponentContainer';
import ProfilesBreadCrumbPanel from './panels/ProfilesBreadCrumbPanel';
import  * as profileActionCreators from './redux/profileactioncreators'
import  * as hostActionCreators from './redux/hostactioncreators';
import  * as toplevelActionCreators from './redux/toplevelactioncreators';
import HostsBreadCrumbPanel from './panels/HostsBreadCrumbPanel';
import SettingsPanel from './panels/SettingsPanel';
import { Provider } from 'react-redux'

class  App  extends  BasicRxPanel {

  constructor() {
    super();
  }


  render() {

    var menuitems = [];
    var navbaritems = [];
    menuitems  = ['Profiles','Hosts','Logging','Configuration'];
    navbaritems = ['Overview','Settings','Help','Logout'];

    var componentContainer = "empty";
    var currentComponent =  "empty";
    //var innerComponentRef = "empty";
    //var bcPanelRef = "empty";
    var modalHandle = "empty";
    var store = this.props.store;

      var onMenuLoad = function() {
      //  Do nothing
      }
      var onModalLoad = function(element) {
        modalHandle.setBody(element);
      }

    var settings = <SettingsPanel/>
  //  var innerComponent =  profiles;

    var navbarClick = function(id) {
      switch(id) {
        case "Settings":
          store.dispatch(toplevelActionCreators.loadSettingsPanel())
        break;
        case "Logout":
          store.dispatch(toplevelActionCreators.logout())
      }
    }
    var menuClick = function(id) {

      switch (id) {
        case "Profiles":
            store.dispatch(toplevelActionCreators.loadProfilesPanel())
          break;
        case "Hosts":
           store.dispatch(toplevelActionCreators.loadHostsPanel())
          break;
        case "Logging":
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
          <ComponentContainer ref={(container) => { currentComponent = container }}/>
        </div>
        </div>

      </div></Provider>

  }

}

export default App;
