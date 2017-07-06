import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import createStore from './redux/createstore'



  const store = createStore();
ReactDOM.render(

  <App store={store} />,
  document.getElementById('app')

);
