import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import Button from './components/Button';
import Modal from './components/Modal';
import Menu from './components/Menu';
import ComponentContainer from './components/ComponentContainer';

import ProfilePanel  from './panels/ProfilePanel';

const headers_1 = ['#','Version 1','Date','Docker image','Version image','Jira ticket'];
const headers_2 = ['#','Version 2','Date','Docker image','Version image','Jira ticket'];


Axios.post('http://localhost:8000/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

var data = [];
var menuitems = [];
var components = [];


data[0] = ['1','test1','test2','test3','test4','test5'];
data[1] = ['2','test1','test2','test3','test4','test5'];

menuitems  = ['Profiles','Logging','Reports','Configuration'];
var componentContainer = "empty"
var currentComponent =  "empty"
var component1 = <Table headers={headers_1} data={data} />
var component2 = <Table headers={headers_2} data={data} />

var profilePanel = <ProfilePanel/>
var buttondropdown =     <Button modal_target="#myModal" data_toggle="modal"/>
var test = function(id) {
  if(id == "Profiles") {
    currentComponent.setInnerComponent(profilePanel)
  }
  else if (id == "Logging") {
    currentComponent.setInnerComponent(buttondropdown)
  }
}


ReactDOM.render(
  <div className="vertical-left">
  <Modal modalId="myModal" closeButtonText="Cancel" title="New Profile"  saveButtonText="Create" vote={test} body={profilePanel} />
    <div className="row">
    <div className="col-md-1 col-xs-offset-2">
     <Menu menuitems={menuitems} onclick={test}/>
    </div>
    </div>
    <div className="row">
    <div className="col-md-1 col-xs-offset-2">
      <ComponentContainer ref={(container) => { currentComponent = container }}  innerComponent={buttondropdown}/>
    </div>
    </div>

  </div>,
  document.getElementById('app')

);
