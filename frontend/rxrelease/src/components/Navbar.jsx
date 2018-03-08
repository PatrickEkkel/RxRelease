import React from 'react';
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import  * as loginActionCreators from '../redux/loginactioncreators'


class Navbar extends BasicRxPanel {
  constructor() {
    super('NAVBAR','NAVBARPANEL')
    var currentContext = this;
    this.getLogger().debug("Mode before rendering: " + this.state.type)
    this.state = {
      selectedItem: "empty",
      mode: "LOGGED_OUT"
    }
  }
/*  getCurrentAuthState() {
    this.getLogger().debug("current state: " + localStorage.getItem("LOGGED_IN_STATE"))
    return localStorage.getItem("LOGGED_IN_STATE");
  }
  updateCurrentAuthState() {
     localStorage.setItem("LOGGED_IN_STATE",this.state.mode)
  }*/
  getMenuItems() {
    var result = [];
    if(this.state.mode == "LOGGED_OUT") {
      this.getLogger().debug("not authenticated, hide navbar")
    }
    else if(this.state.mode == "LOGGED_IN") {
      result = this.props.menuitems || []
    }
    return result;
  }
  onClickEvent(id) {

    this.props.onClick(id)
  }
  componentWillMount() {

    var {type} = this.props;

    this.getLogger().debug("current mode: " + this.state.mode)
    this.getLogger().debug("curent recieved type: " + type)
    this.props.dispatch(loginActionCreators.checkIfLoggedIn())

  /*  switch (type) {
      case 'INITIAL_APP_STATE':
        this.getLogger().debug("INITIAL_APP_STATE called")
        this.props.dispatch(loginActionCreators.checkIfLoggedIn())
        break;

      default:

    }
    */
  }
  componentWillReceiveProps(nextProps) {
    this.getLogger().debug("Recieved nextProps.type: " + nextProps.type)
    this.getLogger().debug("Current mode: " + this.state.mode)
    switch(nextProps.type) {
      case 'INITIAL_APP_STATE':
        this.getLogger().debug("current mode: " + this.state.mode)
        this.props.dispatch(loginActionCreators.checkIfLoggedIn())

      case 'AUTHENTICATION_ERROR':
        this.getLogger().debug("Authenticaton error")
        this.setState({mode: 'LOGGED_OUT'})
        //this.updateCurrentAuthState()
      break;
      case 'AUTHENTICATION_SUCCESS':
      this.getLogger().debug("Authenticaton successfull")
        this.setState({mode: 'LOGGED_IN'})
      break;
    }
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

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._toplevel.type,
  }
}

const ConnectedNavbar = connect(mapStateToProps)(Navbar)

export default ConnectedNavbar;
