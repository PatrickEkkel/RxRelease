import React from 'react';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import StatetypeManagementPanel from './StatetypeManagementPanel'
import StatetypesPanel from './StatetypesPanel'
import  * as statetypeActionCreators from '../redux/statetypeactioncreators'
import { connect } from 'react-redux'

class  StatetypesParentPanel  extends BasicRxPanel {

constructor() {
super('STATES','STATETYPES_PARENT_PANEL')
 this.state = {}
}

componentWillReceiveProps(nextProps) {

  var type = nextProps.type
}

componentWillMount() {

var { type } = this.props;

}

render() {

var currentContext = this;
var { type } = this.props;
var currentPanel = <StatetypesPanel/>

  switch (type) {
    case 'LOAD_STATETYPE_MANAGEMENT_FROM_STATETYPES':
      currentPanel = <StatetypeManagementPanel/>

      //this.props.dispatch
    break;
    default:

  }

return <div>{currentPanel}</div>
}

}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._statetypes.type,
  }
}

const ConnectedStatetypesParentPanel = connect(mapStateToProps)(StatetypesParentPanel)

export default ConnectedStatetypesParentPanel;
