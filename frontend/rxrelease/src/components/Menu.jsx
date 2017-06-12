import React from 'react';

class Menu extends React.Component {
  constructor() {
    super()
    var currentContext = this;
    this.state = {
      selectedItem: "empty"
    }
  }
  getMenuItems() {
    return this.props.menuitems || [];
  }
  onClickEvent(id) {
    this.setState({selectedItem: id})
    this.props.onclick(id);
  }
  onLoad(id) {
    this.setState({selectedItem: id})
    this.props.onLoad(id);
  }
  getSelectedMenuitem() {
    return this.props.selectedItem;
  }
  render() {
    var currentContext = this;

    if(this.state.selectedItem == "empty") {
      this.onLoad(this.getSelectedMenuitem())
    }
    var rows = [];

    var link = "";
    var menuitem = "";
    this.getMenuItems().forEach(function(entry) {
      //entry =>
      link =  <a href="#"  onClick={currentContext.onClickEvent.bind(currentContext,entry)}>{entry}</a>
      if(entry == currentContext.state.selectedItem) {
          rows.push(<li className="active">{link}</li>)
      }
      else {
       rows.push(<li>{link}</li>)
      }
      //  rows.push({menuitem});

    });


return <div className="container-fluid">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            {rows}
          </ul>
        </div>
      </div>
  }
}
export default Menu;
