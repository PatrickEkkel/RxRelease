import React from 'react';

class  LabeledTable  extends React.Component {
  constructor() {
    super()
  }
  getHeaders() {
    return this.props.headers || [];
  }
  getData() {
    return this.props.data || [];
  }
  getLabelStatus(entry) {

    if(this.props.onLabelLoad == null) {
      return  "label"
    }
    else {
      return this.props.onLabelLoad(entry)

    }


  }
  getLabelStatusText(entry) {
    return entry[entry.length-1];
  }
  getLabelText()  {
    return this.props.labelText;
  }
  onRowClick(entry) {
      if(this.props.onRowClick != null) {
        this.props.onRowClick(entry);
      }
  }
  renderColumn(entry,innerentry,i) {
     var currentContext = this;
     var result =  <td key={innerentry}>{innerentry}</td>;

     if(entry.length-1 == i) {

       result = <td key={entry}><span className={currentContext.getLabelStatus(entry)}>{currentContext.getLabelStatusText(entry)}</span></td>
     }
    return result;
  }
  render() {
    var currentContext = this;
return <div className="table-responsive" >
<table className="table table-striped">
      <thead>
        <tr>
          { this.getHeaders().map(entry =>
            <th key={entry}>{entry}</th>)
          }
          <th>{currentContext.getLabelText()}</th>
        </tr>
      </thead>
      <tbody>
        { this.getData().map(entry =>

        <tr className="showpointer" key={entry[0]} onClick={() => currentContext.onRowClick(entry)} >
          {entry.map((innerentry,i) =>
            currentContext.renderColumn(entry,innerentry,i)
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

export default LabeledTable
