import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import Table from './components/Table';

const pair = ['Trainspotting', '28 Days Later'];

const headers = ['#','Version','Date','Docker image','Version image','Jira ticket'];


var data = [];

data[0] = ['1','test1','test2','test3','test4','test5'];
data[1] = ['2','test1','test2','test3','test4','test5'];


ReactDOM.render(

  <Table headers={headers} data={data} />,
  document.getElementById('app')
);
