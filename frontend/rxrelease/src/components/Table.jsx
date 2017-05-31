import React from 'react';


//Class Table extends React.Component {
//constructor() {
//  super()
//  this.state = {
//    selectedItem: "empty"
//  }
///}
//}

//export default table

export default React.createClass({
  getHeaders: function() {
    return this.props.headers || [];
  },
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
return <div className="table-responsive" >
<table className="table table-striped">
      <thead>
        <tr>
          { this.getHeaders().map(entry =>
            <th>{entry}</th>)
          }
        </tr>
      </thead>
      <tbody>
        { this.getData().map(entry =>
        <tr>
          {entry.map(innerentry =>
            <td>{innerentry}</td>
          )}
        </tr>)
       }
      </tbody>
    </table>
</div>;
  }
});
