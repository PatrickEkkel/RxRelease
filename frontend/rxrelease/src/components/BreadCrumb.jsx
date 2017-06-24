import React from 'react';

class BreadCrumb extends React.Component {

constructor() {
 super();
 this.state = {
   items: null,
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
render() {

  var renderList = [];
  for(var i=0;i<this.getItems().length;i++) {
    if(i == this.getItems().length-1) {
      renderList.push(<li className="breadcrumb-item active">{this.getItems()[i]}</li>)
    }
    else {
      renderList.push(<li className="breadcrumb-item"><a href="#">{this.getItems()[i]}</a></li>)
    }

  }


  return <div>
<ol className="breadcrumb">
  {renderList}
</ol></div>
}

}

export default BreadCrumb;
