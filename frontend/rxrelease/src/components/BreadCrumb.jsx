import React from 'react';

class BreadCrumb extends React.Component {

constructor() {
 super();
 this.state = {
   items: null
 }
 }
getItems() {
  var currentContext = this;
  var result = this.state.items;
  if(this.state.items == null) {
    this.setState({items: currentContext.props.items });
    result = this.props.items;
  }
  return result;
}
setItems(items) {
  this.setState({items: items});
}
onClick(clickedItem) {
  this.props.onClick(clickedItem)
}

componentWillMount() {



}

componentWillReceiveProps(nextProps) {

}
render() {

  var renderList = [];
  var currentContext = this;
  var liElement = null;
  this.getItems().map(entry =>
    //if(i == this.getItems().length-1) {
    //  liElement = <li className="breadcrumb-item active" key={item}>{item}</li>
      //renderList.push(liElement)
    //}
    //else {
    //  liElement = <li  className="breadcrumb-item" key={entry}><a href="#" onClick={() => currentContext.onClick(i)}>{item}</a></li>
  //  }
    renderList.push(<li  className="breadcrumb-item" key={entry}><a href="#" onClick={() => currentContext.onClick(entry)}>{entry}</a></li>)
  );
  return <div>
<ol className="breadcrumb">
  {renderList}
</ol></div>
}

}

export default BreadCrumb;
