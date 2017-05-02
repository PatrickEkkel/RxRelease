import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import Table from './components/Table';
import Button from './components/Button';
import Modal from './components/Modal';

const pair = ['Trainspotting', '28 Days Later'];

const headers = ['#','Version','Date','Docker image','Version image','Jira ticket'];


var data = [];

data[0] = ['1','test1','test2','test3','test4','test5'];
data[1] = ['2','test1','test2','test3','test4','test5'];

var test = function() {
  console.log("lekker testen")
}


ReactDOM.render(
  <div className="vertical-center">
  <Modal modalId="myModal" closeButtonText="Lekker testen"  saveButtonText="boemboem" vote={test} />
    <div className="row">
     <div className="col-md-5 col-xs-offset-2">
       <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
         Launch demo modal
       </button>
     </div>
    </div>

    <div className="row">
    <div className="col-md-5 col-xs-offset-2">
     <Table headers={headers} data={data} />
    </div>
    </div>
    <div className="row">
    <div className="col-md-1 col-xs-offset-2">
    <Button/>
    </div>
    </div>
  </div>,
  document.getElementById('app')

);
