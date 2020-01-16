import React from 'react';
import { connect } from 'react-redux'
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import Utils from '../../../lib/react/utils';

import LabeledDropdown from '../../../components/LabeledDropdown';
import StandardListConverters from '../../../converters/StandardListConverters';
import  * as saltconfigurationActionCreator from '../redux/saltconfigurationactioncreators';



class StatetypeConfigurationPanel  extends BasicRxPanel {

  constructor() {
    super('SALT','STATETYPE_CONFIGURATIONPANEL')
    this.state = {
      saltformulas: [],
      selected_saltformula: null
    }

  }

  componentWillMount() {

    var {type} = this.props;

    this.props.dispatch(saltconfigurationActionCreator.loadAllSaltFormulas())
  }

  getSaltFormulabyId(id) {

    for(var i=0;i<this.state.saltformulas.length;i++) {
      if(this.state.saltformulas[i].getId() == id) {
        return this.state.saltformulas[i];
      }
    }
    return null;
  }

  componentWillReceiveProps(nextProps) {

    switch (nextProps.type) {
      case 'SALT_CONFIGURATION_LOADED':
        this.getLogger().trace('saltformulas received')
        this.getLogger().traceObject(nextProps.saltformulas)
        this.setState({saltformulas: nextProps.saltformulas})
        break;
      default:
    }

    switch (nextProps.statetype_type) {
      case 'UPDATE_STATETYPE_PLUGINS':
        var selected_saltformula = this.getSaltFormulabyId(this.state.saltstate)
        var selected_statetype = nextProps.selected_statetype
        this.getLogger().trace('selected formula')
        this.getLogger().traceObject(selected_saltformula)

        this.getLogger().trace('selected statetype')
        this.getLogger().traceObject(selected_statetype)
        this.props.dispatch(
          saltconfigurationActionCreator.coupleFormulaToStatetype(selected_saltformula.getId(),selected_statetype.id))
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
    statetype_type: state._statetypes.type,
    selected_statetype: state._statetypes.statetype,
    saltformulas: state._saltconfiguration.saltformulas
  }
}

const ConnectedStatetypeConfigurationPanel = connect(mapStateToProps)(StatetypeConfigurationPanel)

export default ConnectedStatetypeConfigurationPanel;
