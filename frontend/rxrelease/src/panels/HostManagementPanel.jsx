import React from 'react';
import  * as hostActionCreators from '../redux/hostactioncreators'
import Button from '../components/Button'
import LabeledTable from '../components/LabeledTable'
import { connect } from 'react-redux'


class  HostManagementPanel  extends React.Component {

  constructor() {
    super()

  }

  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  onRowClick(entry) {
  }

  componentWillMount() {
    var {type} = this.props;

  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    var { type } = this.props

    var headers = ['#','name','installed'];
    var data = [];
    return <div>
      <LabeledTable labelText="Status" headers = {headers} data={data} onRowClick={(entry) => currentContext.onRowClick(entry)}/>

      <Button title="Install Host"/>


      </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._hostmanagement.type,
  }
}

const ConnectedHostManagementPanel = connect(mapStateToProps)(HostManagementPanel)

export default ConnectedHostManagementPanel;
