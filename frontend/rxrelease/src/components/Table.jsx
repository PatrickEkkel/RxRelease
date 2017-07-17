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
  onRowClick(entry) {
      if(this.props.onRowClick != null) {
        this.props.onRowClick(entry);
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
        <tr className="showpointer" key={entry[0]} onClick={() => currentContext.onRowClick(entry)}>
          {entry.map(innerentry =>
            <td>{innerentry}</td>
          )}
        </tr>)
       }
      </tbody>
    </table>
    <form className="form-horizontal">

</form>

</div>;
  }
}

export default Table
