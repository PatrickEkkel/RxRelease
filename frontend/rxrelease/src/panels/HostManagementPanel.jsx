import React from 'react';
import  * as hostActionCreators from '../redux/hostactioncreators'
import Button from '../components/Button'
import LabeledTable from '../components/LabeledTable'
import StateFactory from '../factories/stateFactory'
import { connect } from 'react-redux'


class  HostManagementPanel  extends React.Component {

  constructor() {
    super()
    this.state = {
      states: []
    }

  }

  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  onRowClick(entry) {
  }

  componentWillMount() {
    var {type,selected_host} = this.props;
    if(type == 'LOAD_HOST_MANAGEMENT_FROM_HOSTS') {

      this.setState({states: selected_host.getStates()})

    }
  }
  componentWillReceiveProps(nextProps) {

  }

  render() {
    var { type } = this.props

    function handleLabelLoad(entry) {
        if(entry[2] == "NOT INSTALLED") {
          return "label-important label"
        }else {
          return "label-success label"
        }

    }

    var headers = ['#','name'];
    var data = [];
    return <div>
      <LabeledTable onLabelLoad={handleLabelLoad} labelText="Status" headers = {headers} data={StateFactory.convertStateListToMap(this.state.states)} onRowClick={(entry) => currentContext.onRowClick(entry)}/>

      <Button title="Install Host"/>


      </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._hostmanagement.type,
    selected_host: state._hostmanagement.selected_host
  }
}

const ConnectedHostManagementPanel = connect(mapStateToProps)(HostManagementPanel)

export default ConnectedHostManagementPanel;
