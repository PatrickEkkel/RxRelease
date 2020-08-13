import React from 'react';
import LabeledTable from '../components/LabeledTable';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import { connect } from 'react-redux'

class LoggingPanel extends BasicRxPanel {
  constructor() {
    super("LOGGING","LOGGINGPANEL")
    this.state = {}
  }
  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {

  }
  onRowClick(entry) {
    alert('jup werkt')
  }
  render() {
    var headers = ['id','logobject']
    var logobjects = []
    var currentContext  = this;
    return <div>
    <LabeledTable labelText="" headers = {headers} data={logobjects} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
    </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._settings.type,
  }
}
const ConnectedLoggingPanel = connect(mapStateToProps)(LoggingPanel)

export default ConnectedLoggingPanel;
