import React from 'react';

class  Table  extends React.Component {
  constructor() {
    super()
  }
  getHeaders() {
    return this.props.headers || [];
  }
  getData() {
    return this.props.data || [];
  }
  onRowClick() {
      if(this.props.onRowClick != null) {
        this.props.onRowClick();
      }
  }
  render() {
    var currentContext = this;
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
        <tr className="showpointer" key={entry[0]} onClick={currentContext.onRowClick.bind(currentContext)}>
          {entry.map(innerentry =>
            <td>{innerentry}</td>
          )}
        </tr>)
       }
      </tbody>
    </table>
    <form class="form-horizontal">

</form>

</div>;
  }
}

export default Table
