import React from 'react';

export default React.createClass({

  render: function() {
return     <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li className="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Release</a></li>
            <li><a href="#">Logging</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Configuration</a></li>
          </ul>
        </div>;
  }
});
