import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import Table from './components/Table';
import Button from './components/Button';
import Modal from './components/Modal';
import Menu from './components/Menu';
import ComponentContainer from './components/ComponentContainer';

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
var component1 = <Table headers={headers_1} data={data} />
var component2 = <Table headers={headers_2} data={data} />
var test = function(id) {
currentComponent.setInnerComponent(component2)
}


ReactDOM.render(
  <div className="vertical-center">
  <Modal modalId="myModal" closeButtonText="Lekker testen"  saveButtonText="boemboem" vote={test} />
    <div className="row">
     <div className="col-md-5 col-xs-offset-2">
    <Button modal_target="#myModal" data_toggle="modal"/>
     </div>
    </div>
    <div className="row">
    <div className="col-md-5 col-xs-offset-2">
      <ComponentContainer ref={(container) => { currentComponent = container }}  innerComponent={component1}/>
    </div>
    </div>
    <div className="row">
    <div className="col-md-1 col-xs-offset-2">
    <Menu menuitems={menuitems} onclick={test}/>
    </div>
    </div>
  </div>,
  document.getElementById('app')

);
