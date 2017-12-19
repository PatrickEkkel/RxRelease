import React from 'react';
import { connect } from 'react-redux'

class Navbar extends React.Component {
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

    this.props.onClick(id)
  }


  render() {
    var currentContext = this;
return     <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">RxRelease</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            { this.getMenuItems().map(entry =>
              <li key={entry}><a href="#" onClick={() => currentContext.onClickEvent(entry) }>{entry}</a></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  }
}



//const ConnectedNavbar = connect(mapStateToProps)(Navbar)

export default Navbar;
