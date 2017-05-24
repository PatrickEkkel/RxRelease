import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import Table from './components/Table';
import Button from './components/Button';
import Modal from './components/Modal';
import Menu from './components/Menu';

const headers = ['#','Version','Date','Docker image','Version image','Jira ticket'];


var data = [];
var menuitems = [];

data[0] = ['1','test1','test2','test3','test4','test5'];
data[1] = ['2','test1','test2','test3','test4','test5'];

menuitems  = ['Release','Logging','Reports','Configuration'];

var test = function(id) {
}


  <Table headers={headers} data={data} />,
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
     <Table headers={headers} data={data} />
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
