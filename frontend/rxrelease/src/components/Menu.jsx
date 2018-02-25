import React from 'react';
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel';
import  * as actionCreators from '../redux/actioncreators'

class Menu extends BasicRxPanel {
  constructor() {
    super("MENU","MENUPANEL")
    var currentContext = this;
    this.state = {
      selectedItem: "empty",
      mode: "LOGGED_IN"
    }
  }
  getMenuItems() {
    return this.props.menuitems || [];
  }
  onClickEvent(id) {
    this.props.dispatch(actionCreators.changeSelectedMenu(id));
    this.props.onclick(id);
  }
  componentWillMount() {
    var {type} = this.props;

    if(type == 'AUTHENTICATION_ERROR') {
      this.getLogger().debug("not authenticated, hide menu")
      this.getLogger().traceObject(type)
      this.setState({mode: "LOGGED_OUT"});
    }

  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;

    if(type == 'AUTHENTICATION_ERROR') {
      this.setState({mode: "LOGGED_OUT"});
    }
  }

  render() {
    var { selectedMenu,type,reduxState } = this.props

    var currentContext = this;

    var rows = [];

    var link = "";
    var menuitem = "";
    this.getLogger().debug("not authenticated, hide menu")
    this.getLogger().traceObject(this.state.mode)

    if(this.state.mode != "LOGGED_OUT") {

      this.getMenuItems().forEach(function(entry) {
      //entry =>
        link =  <a href="#"  onClick={() => currentContext.onClickEvent(entry)}>{entry}</a>
        if(entry ==  selectedMenu) {
            rows.push(<li className="active" key={entry}>{link}</li>)
          }
        else {
          rows.push(<li key={entry}>{link}</li>)
        }
      });
    }


return <div className="container-fluid">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            {rows}
          </ul>
        </div>
      </div>
  }
}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._menu.type,
    selectedMenu: state._menu.selectedMenu,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedMenu = connect(mapStateToProps)(Menu)

export default ConnectedMenu
