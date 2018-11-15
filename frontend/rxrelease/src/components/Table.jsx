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
  renderColumn(i,innerentry,headerlength) {

    if(headerlength < i) {
      return ""
    }
    else {
     return <td key={innerentry + i}>{innerentry}</td>
    }
  }
  render() {
    var currentContext = this;
return <div className="table-responsive" >
<table className="table table-striped">
      <thead>
        <tr>
          { this.getHeaders().map(entry =>
            <th key={entry + Math.floor((Math.random() * 100) + 1)} >{entry}</th>)
          }
        </tr>
      </thead>
      <tbody>
        { this.getData().map(entry =>
        <tr className="showpointer" key={entry[0]} onClick={() => currentContext.onRowClick(entry)} >
          {entry.map((innerentry,i) =>
              currentContext.renderColumn(i,innerentry,currentContext.getHeaders().length)
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
