import React from 'react';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import StatetypeManagementPanel from './StatetypeManagementPanel'
import StatetypesPanel from './StatetypesPanel'
import  * as statetypeActionCreators from '../redux/statetypeactioncreators'
import { connect } from 'react-redux'

class  StatetypesParentPanel  extends BasicRxPanel {

constructor() {
super('STATES','STATETYPES_PARENT_PANEL')
 this.state = {
   viewmode: 'overview'
 }
}

componentWillReceiveProps(nextProps) {

  var type = nextProps.type
  switch (type) {
    case 'LOAD_STATETYPE_MANAGEMENT_FROM_STATETYPES':
      this.setState({viewmode: 'detail'})
    break;
    case 'INITIAL_STATETYPE_STATE':
      this.setState({viewmode: 'overview'})
    default:

  }

}

componentWillMount() {

var { type } = this.props;

}

render() {

var overviewPanel = <StatetypesPanel selectedConfiguration={this.props.selectedConfiguration}/>
var detailPanel = <StatetypeManagementPanel/>
var currentPanel = null;
  switch (this.state.viewmode) {
    case 'detail':
      currentPanel = detailPanel;
    break;
    case 'overview':
      currentPanel = overviewPanel;
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
