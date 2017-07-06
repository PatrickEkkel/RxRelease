import React from 'react';
import { connect } from 'react-redux'
import  * as actionCreators from '../redux/actioncreators'

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
    // call dispatch
    console.log("give me the dispatch method ")
    this.props.dispatch(actionCreators.SendMessage("Hi"));

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

        var { frozen, time, reduxState } = this.props

        if(frozen) {
          alert('state change works!!!')
        }
    var currentContext = this;

    if(this.state.selectedItem == "empty") {
      this.onLoad(this.getSelectedMenuitem())
    }
    var rows = [];

    var link = "";
    var menuitem = "";
    this.getMenuItems().forEach(function(entry) {
      //entry =>
      link =  <a href="#"  onClick={() => currentContext.onClickEvent(entry)}>{entry}</a>
     if(entry == currentContext.state.selectedItem) {
          rows.push(<li className="active" key={entry}>{link}</li>)
      }
      else {
       rows.push(<li key={entry}>{link}</li>)
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

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    frozen: state._time.frozen,
    time: state._time.time,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedMenu = connect(mapStateToProps)(Menu)

export default ConnectedMenu
