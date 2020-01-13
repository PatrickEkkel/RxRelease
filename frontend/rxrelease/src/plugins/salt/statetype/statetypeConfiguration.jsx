import React from 'react';
import { connect } from 'react-redux'
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import LabeledDropdown from '../../../components/LabeledDropdown';
import StandardListConverters from '../../../converters/StandardListConverters';
import  * as saltconfigurationActionCreator from '../redux/saltconfigurationactioncreators';



class StatetypeConfigurationPanel  extends BasicRxPanel {

  constructor() {
    super('SALT','STATETYPE_CONFIGURATIONPANEL')
    this.state = {
      saltformulas: []
    }

  }

  componentWillMount() {

    var {type} = this.props;

    this.props.dispatch(saltconfigurationActionCreator.loadAllSaltFormulas())


  }
  componentWillReceiveProps(nextProps) {

    alert(nextProps.type)
    switch (nextProps.type) {
      case 'SALT_CONFIGURATION_LOADED':
        this.getLogger().trace('saltformulas received')
        this.getLogger().traceObject(nextProps.saltformulas)
        this.setState({saltformulas: nextProps.saltformulas})
        break;
      default:

    }

  }

  render() {
    return <div className="row" >
    <LabeledDropdown id="saltstate" selectedValue="" errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.saltformulas)} label="Salt State" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._saltconfiguration.type,
    saltformulas: state._saltconfiguration.saltformulas
  }
}

const ConnectedStatetypeConfigurationPanel = connect(mapStateToProps)(StatetypeConfigurationPanel)

export default ConnectedStatetypeConfigurationPanel;
