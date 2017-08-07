import React from 'react';
import  * as hostActionCreators from '../redux/hostactioncreators'
import Button from '../components/Button'
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

    return <div><Button title="Install Host"/></div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._hostmanagement.type,
  }
}

const ConnectedHostManagementPanel = connect(mapStateToProps)(HostManagementPanel)

export default ConnectedHostManagementPanel;
