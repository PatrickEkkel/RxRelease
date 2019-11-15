import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../components/panels/BasicRxPanel';

class StatetypesPanel extends BasicRxPanel {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {

  }


  componentWillReceiveProps(nextProps) {

  }

  render() {
    return <div>test</div>
  }
}

  const mapStateToProps = (state/*, props*/) => {
    return {
      type: state._recipe.type,
      selected_configuration: state._recipe.selected_configuration,
      selected_profile: state._recipe.selected_profile,
      hosts: state._recipe.hosts,
      addedHost: state._recipe.addedHost
    }
  }

const ConnectedStatetypesPanel = connect(mapStateToProps)(StatetypesPanel)
export default ConnectedStatetypesPanel;
