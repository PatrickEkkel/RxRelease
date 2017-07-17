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
setItems(items) {
  this.setState({items: items});
}
onClick(clickedItem) {
  this.props.onClick(clickedItem)
}
render() {

  var renderList = [];
  var currentContext = this;
  for(var i=0;i<this.getItems().length;i++) {
    if(i == this.getItems().length-1) {
      renderList.push(<li className="breadcrumb-item active" key={this.getItems()[i]}>{this.getItems()[i]}</li>)
    }
    else {
      var item = this.getItems()[i];
      renderList.push(<li  className="breadcrumb-item" key={item}><a href="#" onClick={() => currentContext.onClick(item)}>{item}</a></li>)
    }

  }


  return <div>
<ol className="breadcrumb">
  {renderList}
</ol></div>
}

}

export default BreadCrumb;
