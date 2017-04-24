import React from 'react';

export default React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },
  render: function() {
return <div className="col-sm-9 col-sm-offset-3 col-md-5 col-md-offset-2 main">
<div className="table-responsive" >
<table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Version</th>
          <th>Date</th>
          <th>docker image</th>
          <th>version</th>
          <th>Jira ticket</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1,001</td>
          <td>Lorem</td>
          <td>ipsum</td>
          <td>dolor</td>
          <td>sit</td>
          <td>sit</td>
        </tr>
        <tr>
          <td>1,002</td>
          <td>amet</td>
          <td>consectetur</td>
          <td>adipiscing</td>
          <td>elit</td>
          <td>sit</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>Integer</td>
          <td>nec</td>
          <td>odio</td>
          <td>Praesent</td>
          <td>sit</td>
        </tr>

      </tbody>
    </table>
</div></div>;
  }
});
